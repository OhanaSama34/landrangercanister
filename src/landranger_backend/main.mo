import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Order "mo:base/Order";

actor class LandRegistrySystem() = this {
  // Types tetap sama
  public type TokenId = Nat64;
  public type MetadataValue = {
    #Text : Text;
    #Nat : Nat;
    #Int : Int;
    #Blob : Blob;
    #Array : [MetadataValue];
  };
  public type TokenMetadata = [(Text, MetadataValue)];
  public type TransferEvent = {
    from : Principal;
    to : Principal;
    tokenId : TokenId;
  };

  public type HakType = { #HM; #HGB; #HP; #HGU; #HPL; };
  public type BatasTanah = { utara : Text; selatan : Text; timur : Text; barat : Text; };
  public type LetakBatas = { 
    alamat : Text; 
    kecamatan : Text; 
    kabupaten : Text; 
    provinsi : Text; 
    batas : BatasTanah; 
  };

  // Stable Storage
  stable var landMetadataEntries : [(TokenId, TokenMetadata)] = [];
  stable var tokenOwnersEntries : [(TokenId, Principal)] = [];
  stable var eventsEntries : [TransferEvent] = [];
  stable var counter : Nat64 = 0;
  stable var registeredNIBs : [(Text, TokenId)] = [];

  // Hash functions tetap sama
  func nat64Equal(a : TokenId, b : TokenId) : Bool { Nat64.equal(a, b) };
  func nat64Hash(n : TokenId) : Hash.Hash { Hash.hash(Nat64.toNat(n)) };
  func textEqual(a : Text, b : Text) : Bool { Text.equal(a, b) };
  func textHash(t : Text) : Hash.Hash { Text.hash(t) };

  // Mutable State
  var landMetadata = HashMap.HashMap<TokenId, TokenMetadata>(10, nat64Equal, nat64Hash);
  var tokenOwners = HashMap.HashMap<TokenId, Principal>(10, nat64Equal, nat64Hash);
  var events = Buffer.Buffer<TransferEvent>(10);
  var nibRegistry = HashMap.HashMap<Text, TokenId>(10, textEqual, textHash);

  // Fungsi standar ICRC-7 tetap sama
  public query func icrc7_name() : async Text { "LandRegistry NFT" };
  public query func icrc7_symbol() : async Text { "LAND-NFT" };
  public query func icrc7_total_supply() : async Nat64 { counter };
  
  public query func icrc7_metadata(tokenId : TokenId) : async ?TokenMetadata {
    landMetadata.get(tokenId)
  };

  public query func icrc7_owner_of(tokenId : TokenId) : async ?Principal {
    tokenOwners.get(tokenId)
  };

  // Fungsi mint dengan kepemilikan awal
  public shared({ caller }) func mintLandNFT(
    landData : {
      jenisHak : HakType;
      nomorSertifikat : Text;
      luasTanah : Nat;
      letakBatas : LetakBatas;
      nib : Text;
      nilaiAset : Nat;
      gambar : Text;
    }
  ) : async Result.Result<TokenId, Text> {
    switch (nibRegistry.get(landData.nib)) {
      case (?existingTokenId) {
        #err("NIB " # landData.nib # " sudah terdaftar dalam NFT dengan ID " # debug_show(existingTokenId))
      };
      case (null) {
        let tokenId = counter;
        counter += 1;

        let metadata : TokenMetadata = [
          ("tokenId", #Nat(Nat64.toNat(tokenId))),
          ("jenisHak", #Text(debug_show(landData.jenisHak))),
          ("nomorSertifikat", #Text(landData.nomorSertifikat)),
          ("luasTanah", #Nat(landData.luasTanah)),
          ("letakBatas", createLetakBatasMetadata(landData.letakBatas)),
          ("nib", #Text(landData.nib)),
          ("nilaiAset", #Nat(landData.nilaiAset)),
          ("gambar", #Text(landData.gambar)),
          ("createdAt", #Nat(Int.abs(Time.now()))),
          ("standard", #Text("ICRC-7"))
        ];

        landMetadata.put(tokenId, metadata);
        tokenOwners.put(tokenId, caller); // Pemilik awal adalah minter
        nibRegistry.put(landData.nib, tokenId);
        
        recordEvent({
          from = Principal.fromText("aaaaa-aa");
          to = caller;
          tokenId = tokenId;
        });

        #ok(tokenId)
      }
    }
  };

  // Fungsi transfer kepemilikan
  public shared({ caller }) func icrc7_transfer_from(
    from : Principal,
    to : Principal,
    tokenId : TokenId
  ) : async Result.Result<(), Text> {
    switch(tokenOwners.get(tokenId)) {
      case(null) { #err("Token tidak ditemukan") };
      case(?owner) {
        if (owner != caller) {
          return #err("Tidak memiliki otorisasi");
        };
        
        tokenOwners.put(tokenId, to);
        recordEvent({ from; to; tokenId });
        #ok()
      }
    }
  };

  // Fungsi baru: Dapatkan metadata berdasarkan kepemilikan saat ini + sorting
  public shared({ caller }) func get_my_owned_metadata() : async [TokenMetadata] {
    let buffer = Buffer.Buffer<TokenMetadata>(0);
    
    // Cari semua token yang dimiliki oleh caller
    for ((tokenId, owner) in tokenOwners.entries()) {
      if (owner == caller) {
        switch (landMetadata.get(tokenId)) {
          case (?metadata) { buffer.add(metadata) };
          case null { };
        };
      };
    };
    
    // Fungsi helper untuk ekstrak timestamp
    func getCreatedAt(metadata : TokenMetadata) : Nat {
      for ((key, value) in metadata.vals()) {
        if (key == "createdAt") {
          switch (value) {
            case (#Nat(n)) { return n };
            case _ { return 0 };
          };
        };
      };
      0
    };
    
    // Sorting descending berdasarkan waktu pembuatan
    let metadataArray = Buffer.toArray(buffer);
    let withCreatedAt = Array.map<TokenMetadata, (Nat, TokenMetadata)>(
      metadataArray,
      func (md) = (getCreatedAt(md), md)
    );
    
    let sorted = Array.sort(withCreatedAt, func (a : (Nat, TokenMetadata), b : (Nat, TokenMetadata)) : Order.Order {
      Nat.compare(b.0, a.0) // Urutkan dari yang terbaru
    });
    
    Array.map<(Nat, TokenMetadata), TokenMetadata>(sorted, func (x) = x.1)
  };

  // Fungsi helper dan lainnya tetap sama
  func createLetakBatasMetadata(lb : LetakBatas) : MetadataValue {
    #Array([
      #Text(lb.alamat),
      #Text(lb.kecamatan),
      #Text(lb.kabupaten),
      #Text(lb.provinsi),
      #Array([
        #Text(lb.batas.utara),
        #Text(lb.batas.selatan),
        #Text(lb.batas.timur),
        #Text(lb.batas.barat)
      ])
    ])
  };

  func recordEvent(event : TransferEvent) {
    events.add(event);
  };

  public query func get_transfer_events() : async [TransferEvent] {
    Buffer.toArray(events)
  };

  // Upgrade hooks
  system func preupgrade() {
    landMetadataEntries := Iter.toArray(landMetadata.entries());
    tokenOwnersEntries := Iter.toArray(tokenOwners.entries());
    eventsEntries := Buffer.toArray(events);
    registeredNIBs := Iter.toArray(nibRegistry.entries());
  };

  system func postupgrade() {
    landMetadata := HashMap.fromIter<TokenId, TokenMetadata>(
      landMetadataEntries.vals(),
      10,
      nat64Equal,
      nat64Hash
    );
    
    tokenOwners := HashMap.fromIter<TokenId, Principal>(
      tokenOwnersEntries.vals(),
      10,
      nat64Equal,
      nat64Hash
    );
    
    events := Buffer.fromArray<TransferEvent>(eventsEntries);
    nibRegistry := HashMap.fromIter<Text, TokenId>(
      registeredNIBs.vals(),
      10,
      textEqual,
      textHash
    );
  };
};