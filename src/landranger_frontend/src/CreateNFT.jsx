import React from "react";
import hiasan from "./assets/hiasan.png";
import { IconChevronLeft } from "@tabler/icons-react";

const CreateNFT = () => {
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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label text-black">
              <span className="label-text">
                NIB <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="nib"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label text-black">
              <span className="label-text">
                Nilai Aset <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="nilaiAset"
              className="input input-bordered"
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
                placeholder="provinsi"
                className="input input-bordered"
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
              <input type="file" className="file-input" />
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
            <select className="select select-bordered">
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
              placeholder="nomorSertifikat"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-2 ">
            <div className="flex w-full justify-end">
              <button type="submit" className="btn btn-primary border">
                Create
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateNFT;
