import { useState, useCallback } from 'react';  
import { Actor, HttpAgent } from '@dfinity/agent';  
import { AuthClient } from '@dfinity/auth-client';  
import hiasan from './assets/hiasan.png';  
import { IconChevronLeft } from '@tabler/icons-react';  
import { idlFactory } from 'declarations/landranger_backend/index.js';  

const CreateNFT = () => {
  const [formData, setFormData] = useState({
    nib: '',
    nilaiAset: '',
    provinsi: '',
    alamat: '',
    kabupaten: '',
    kecamatan: '',
    timur: '',
    selatan: '',
    utara: '',
    barat: '',
    luasTanah: '',
    jenisHak: '',
    nomorSertifikat: '',
    gambar: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initializeActor = useCallback(async () => {  
    try {  
      // Buat AuthClient  
      const authClient = await AuthClient.create();  
      
      // Log status autentikasi  
      console.log('Auth Client Status:', {  
        isAuthenticated: await authClient.isAuthenticated(),  
      });  

      // Autentikasi jika belum login  
      if (!await authClient.isAuthenticated()) {  
        await new Promise((resolve, reject) => {  
          authClient.login({  
            identityProvider: process.env.II_URL || "https://identity.ic0.app",  
            onSuccess: resolve,  
            onError: (error) => {  
              console.error('Login Error:', error);  
              reject(error);  
            }  
          });  
        });  
      }  

      // Dapatkan identitas  
      const identity = authClient.getIdentity();  

      // Buat agent dengan konfigurasi lebih detail  
      const agent = new HttpAgent({   
        identity,  
        host: process.env.IC_HOST || "https://ic0.app"  
      });  

      // Log principal untuk debugging  
      console.log('Identity Principal:', identity.getPrincipal().toText());  

      // Fetch root key hanya di development  
      if (process.env.NODE_ENV !== 'production') {  
        await agent.fetchRootKey().catch(err => {  
          console.error('Error fetching root key:', err);  
        });  
      }  

      // Buat dan kembalikan aktor  
      return Actor.createActor(idlFactory, {  
        agent,  
        canisterId: process.env.CANISTER_ID_LANDRANGER_BACKEND,  
      });  
    } catch (error) {  
      console.error('Actor Initialization Error:', error);  
      throw error;  
    }  
  }, []); // Tambahkan dependency array kosong  

  // [PERUBAHAN UTAMA] Baris 55-116: Perbaikan handleSubmit  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setLoading(true);  
    setError('');  

    try {  
      // Pastikan autentikasi sebelum submit  
      const authClient = await AuthClient.create();  
      if (!await authClient.isAuthenticated()) {  
        await new Promise((resolve, reject) => {  
          authClient.login({  
            onSuccess: resolve,  
            onError: (error) => {  
              setError('Autentikasi gagal');  
              setLoading(false);  
              reject(error);  
            }  
          });  
        });  
      }  

      // Inisialisasi aktor  
      const actor = await initializeActor();  

      // Validasi input (sama seperti sebelumnya)  
      if (!formData.luasTanah || !formData.nilaiAset) {  
        throw new Error('Luas Tanah and Nilai Aset must be numbers');  
      }  

      // Persiapkan data lahan  
      const landData = {  
        jenisHak: formData.jenisHak || '',   
        nomorSertifikat: formData.nomorSertifikat || '',  
        luasTanah: BigInt(formData.luasTanah),  
        letakBatas: {  
          alamat: formData.alamat || '',  
          kecamatan: formData.kecamatan || '',  
          kabupaten: formData.kabupaten || '',  
          provinsi: formData.provinsi || '',  
          batas: {  
            utara: formData.utara || '',  
            selatan: formData.selatan || '',  
            timur: formData.timur || '',  
            barat: formData.barat || '',  
          },  
        },  
        nib: formData.nib || '',  
        nilaiAset: BigInt(formData.nilaiAset),  
        gambar: formData.gambar || '',  
      };  

      // Logging data submission untuk debugging  
      console.log('Submission Data:', {  
        landData,  
        principal: actor.authentication?.getPrincipal()?.toText() || 'Unknown'  
      });  

      // Panggil fungsi mint  
      const result = await actor.mintLandNFT(landData);  

      // Tangani hasil  
      if ('ok' in result) {  
        alert(`NFT Created Successfully! Token ID: ${result.ok}`);  
        // Reset form  
        setFormData({  
          nib: '', nilaiAset: '', provinsi: '', alamat: '',   
          kabupaten: '', kecamatan: '', timur: '', selatan: '',   
          utara: '', barat: '', luasTanah: '', jenisHak: '',   
          nomorSertifikat: '', gambar: '',  
        });  
      } else if ('err' in result) {  
        throw new Error(result.err);  
      }  
    } catch (err) {  
      // Logging error terperinci  
      console.error('Detailed NFT Creation Error:', {  
        message: err.message,  
        stack: err.stack,  
        name: err.name  
      });  

      // Tangani error spesifik  
      if (err.message.includes('delegation') || err.message.includes('authentication')) {  
        setError('Masalah autentikasi. Silakan login ulang.');  
      } else {  
        setError(err.message || 'Gagal membuat NFT');  
      }  

      // Tampilkan alert dengan pesan error  
      alert(`Error: ${err.message}`);  
    } finally {  
      setLoading(false);  
    }  
  };  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      gambar: file.name,
    }));
  };

  return (
    <>
      <section
        id="jumbotron"
        className="hero h-64"
        style={{
          backgroundImage: `url(${hiasan})`, // use imported image
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">Create New NFT</h1>
          </div>
        </div>
      </section>
      <section className="max-w-xl mx-auto my-12">
        <a
          href="/admin"
          className="btn btn-link mb-4 flex items-center gap-2 w-fit p-0"
        >
          <IconChevronLeft className="-ml-2 -mr-1 scale-80" /> Back
        </a>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="form-control">
            <label className="label text-black">
              <span className="label-text">
                NIB <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              name="nib"
              value={formData.nib}
              onChange={handleChange}
              placeholder="nib"
              className="input input-bordered"
              required
            />
          </div>

          {/* Nilai Aset Input */}
          <div className="form-control">
            <label className="label text-black">
              <span className="label-text">
                Nilai Aset <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              name="nilaiAset"
              value={formData.nilaiAset}
              onChange={handleChange}
              placeholder="nilaiAset"
              className="input input-bordered"
              required
            />
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Provinsi <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                placeholder="provinsi"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Alamat <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="alamat"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Kabupaten <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="kabupaten"
                value={formData.kabupaten}
                onChange={handleChange}
                placeholder="kabupaten"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Kecamatan <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="kecamatan"
                value={formData.kecamatan}
                onChange={handleChange}
                placeholder="kecamatan"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Timur <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="timur"
                value={formData.timur}
                onChange={handleChange}
                placeholder="timur"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Selatan <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="selatan"
                value={formData.selatan}
                onChange={handleChange}
                placeholder="selatan"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Utara <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="utara"
                value={formData.utara}
                onChange={handleChange}
                placeholder="utara"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label text-black">
                <span className="label-text">
                  Barat <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="barat"
                value={formData.barat}
                onChange={handleChange}
                placeholder="barat"
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="form-control col-span-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Input Certificate Image
              </legend>
              <input
                type="file"
                className="file-input"
                onChange={handleFileUpload}
                accept="image/*"
                required
              />
            </fieldset>
          </div>

          <div className="form-control">
            <label className="label text-black">
              <span className="label-text">
                Luas Tanah <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              name="luasTanah"
              value={formData.luasTanah}
              onChange={handleChange}
              placeholder="luasTanah"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label text-black">
              <span className="label-text">
                Jenis Hak <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              className="select select-bordered"
              name="jenisHak"
              value={formData.jenisHak}
              onChange={handleChange}
            >
              <option disabled selected>
                Pilih Jenis Hak
              </option>
              <option>HM</option>
              <option>HP</option>
              <option>HGB</option>
              <option>HGU</option>
              <option>HPL</option>
            </select>
          </div>

          <div className="form-control col-span-2">
            <label className="label text-black">
              <span className="label-text mr-2">
                Nomor Sertifikat <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              name="nomorSertifikat"
              value={formData.nomorSertifikat}
              onChange={handleChange}
              placeholder="nomorSertifikat"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-2">
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="btn btn-primary border"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateNFT;
