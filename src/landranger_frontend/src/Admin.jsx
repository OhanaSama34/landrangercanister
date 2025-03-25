import React from "react";
import hiasan from "./assets/hiasan.png";
import { IconPlus } from "@tabler/icons-react";

const Admin = () => {
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
            <h1 className="mb-5 text-3xl font-bold">
              Welcome to the Admin Panel
            </h1>
            <p className="mb-5 text-gray-100">
              Manage all aspects of your platform here.{" "}
            </p>
          </div>
        </div>
      </section>
      <section
        id="sub-header"
        className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto grid grid-cols-1 md:grid-cols-2 border"
      >
        <div className="border">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Your Certificate
          </h2>
        </div>
        <div className="flex justify-end">
          <a href="admin/create-nft" className="btn btn-primary">
            create new certificate <IconPlus />
          </a>
        </div>
      </section>
      <div className="grid place-content-center h-[75%]"></div>
      {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            className="group hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 rounded-xl p-5 transition"
            href="#"
          >
            <div className="aspect-w-16 aspect-h-10">
              <img
                className="w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                alt="Blog Image"
              />
            </div>
            <h3 className="mt-5 text-xl text-gray-800">
              Unity’s inside sales team drives 80% of its revenue with Preline.
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Learn more
              <svg
                className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </a>

          <a
            className="group hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 rounded-xl p-5 transition"
            href="#"
          >
            <div className="aspect-w-16 aspect-h-10">
              <img
                className="w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1669739432571-aee1f057c41f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                alt="Blog Image"
              />
            </div>
            <h3 className="mt-5 text-xl text-gray-800">
              Living Spaces creates a unified experience across the customer
              journey.
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Learn more
              <svg
                className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </a>

          <a
            className="group hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 rounded-xl p-5 transition"
            href="#"
          >
            <div className="aspect-w-16 aspect-h-10">
              <img
                className="w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                alt="Blog Image"
              />
            </div>
            <h3 className="mt-5 text-xl text-gray-800">
              Atlassian powers sales and support at scale with Preline.
            </h3>
            <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
              Learn more
              <svg
                className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </a>
        </div> */}
    </>
  );
};

export default Admin;
