// Admin.jsx
import React, { useState, useEffect } from 'react';
import hiasan from './assets/hiasan.png';
import { IconPlus } from '@tabler/icons-react';
import EmptyImg from './assets/Empty.png';
import CertificateImg from './assets/certificate.png';

const Admin = ({ actor }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!actor) {
        setError('Wallet not connected');
        setLoading(false);
        return;
      }

      try {
        const metadataArray = await actor.get_my_owned_metadata();
        const parsedNfts = metadataArray.map(parseMetadata);
        setNfts(parsedNfts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [actor]);

  const parseMetadata = (metadata) => {
    const obj = {};
    metadata.forEach(([key, value]) => {
      if (key === 'letakBatas' && 'Array' in value) {
        const [alamat, kecamatan, kabupaten, provinsi, batasArray] =
          value.Array;
        obj[key] = {
          alamat: alamat.Text,
          kecamatan: kecamatan.Text,
          kabupaten: kabupaten.Text,
          provinsi: provinsi.Text,
          batas: {
            utara: batasArray.Array[0].Text,
            selatan: batasArray.Array[1].Text,
            timur: batasArray.Array[2].Text,
            barat: batasArray.Array[3].Text,
          },
        };
      } else {
        obj[key] = Object.values(value)[0];
      }
    });
    return obj;
  };

  if (loading) {
    return <div className="text-center p-8">Loading certificates...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-error">Error: {error}</div>;
  }

  return (
    <>
      <section
        id="jumbotron"
        className="hero h-64"
        style={{ backgroundImage: `url(${hiasan})` }}
      >
        {/* ... existing jumbotron content ... */}
      </section>

      <section className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold md:text-4xl">Your Certificates</h2>
          <a href="/admin/create-nft" className="btn btn-primary">
            Create New <IconPlus size={20} />
          </a>
        </div>

        {nfts.length === 0 ? (
          <div className="grid grid-cols-1 gap-8 place-content-center h-[50vh]">
            <div
              className="size-70 bg-center mx-auto"
              style={{
                backgroundImage: `url(${EmptyImg})`,
                backgroundSize: 'cover',
              }}
            />
            <h2 className="text-center text-gray-500">
              No certificates found. Create your first land certificate.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => {
              const details = [
                { label: 'Token ID', value: nft.tokenId },
                { label: 'Certificate No', value: nft.nomorSertifikat },
                { label: 'Land Rights Type', value: nft.jenisHak },
                { label: 'NIB', value: nft.nib },
                { label: 'Land Area', value: `${nft.luasTanah} m²` },
                { label: 'Asset Value', value: nft.nilaiAset },
                { label: 'Address', value: nft.letakBatas.alamat },
                { label: 'District', value: nft.letakBatas.kecamatan },
                { label: 'Regency', value: nft.letakBatas.kabupaten },
                { label: 'Province', value: nft.letakBatas.provinsi },
                { label: 'North Boundary', value: nft.letakBatas.batas.utara },
                {
                  label: 'South Boundary',
                  value: nft.letakBatas.batas.selatan,
                },
                { label: 'East Boundary', value: nft.letakBatas.batas.timur },
                { label: 'West Boundary', value: nft.letakBatas.batas.barat },
              ];
              return (
                <div key={nft.tokenId} className="card bg-base-100 shadow-xl">
                  <div
                    className="h-56 w-full bg-center bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: `url(${CertificateImg})`, // use imported image
                    }}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{nft.jenisHak}</h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Certificate No:</strong> {nft.nomorSertifikat}
                      </p>
                      <p>
                        <strong>NIB:</strong> {nft.nib}
                      </p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          document
                            .getElementById(`modal-${nft.tokenId}`)
                            .showModal()
                        }
                      >
                        View Details
                      </button>
                      <dialog id={`modal-${nft.tokenId}`} className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg mb-4">
                            Certificate Detail
                          </h3>
                          <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-200 text-sm">
                              {details.map((detail) => (
                                <div
                                  key={detail.label}
                                  className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                                >
                                  <dt className="font-medium text-gray-900">
                                    {detail.label}
                                  </dt>
                                  <dd className="text-gray-700 sm:col-span-2">
                                    {detail.value || (
                                      <span className="text-gray-400">
                                        Not specified
                                      </span>
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Admin;
