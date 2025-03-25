import React, { useEffect } from 'react';
import bgHero from './assets/bg-hero.png';
import hiasan from './assets/hiasan.png';
import landRanger1 from './assets/LandRanger1.png';
import landRanger2 from './assets/landRanger2.png';
import feature1 from './assets/feature1.png';
import feature2 from './assets/feature2.png';
import { IconPlayerPlay } from '@tabler/icons-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQData from './data/data';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section
        id="hero"
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${bgHero})`, // use imported image
        }}
      >
        {/* <div className="hero-overlay"></div> */}
        <div className="hero-content text-primary text-center relative">
          <div
            className="absolute -top-8 left-0 rotate-20 size-15 animate-bounce-smooth"
            style={{
              backgroundImage: `url(${landRanger1})`, // use imported image
              backgroundSize: 'cover',
            }}
          />
          <div
            className="absolute bottom-8 -right-12 size-20 animate-bounce-smooth"
            style={{
              backgroundImage: `url(${landRanger2})`, // use imported image
              backgroundSize: 'cover',
            }}
          />
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold ">
              Protect Your Land Ownership From Mafia
            </h1>
            <p className="mb-5 text-gray-600">
              Secure your building and land into NFT easily with us, protect
              your ownership now!
            </p>
            <button className="btn btn-primary rounded-full animate-bounce hover:animate-none transition-all shadow">
              Get Started{' '}
              <span className="p-1 rounded-full border-2 scale-60 -mx-1 -mr-2 ">
                <IconPlayerPlay className="text-sm" />
              </span>
            </button>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="grid grid-cols-1 md:grid-cols-5 max-w-6xl mx-auto p-10 gap-4"
      >
        <div
          id="about-desc"
          data-aos="fade-up"
          data-aos-duration="1000"
          className="col-span-2 prose"
        >
          <div className="sticky top-0">
            <h2>About LandRanger</h2>
            <p>
              We are more than just platform. We build partnerships with a
              shared passion and an unwavering commiment to protecting your land
              and home.
            </p>
          </div>
        </div>
        <div
          id="about-vision-mission"
          className="col-span-3 flex flex-col items-end gap-4 prose"
        >
          <div
            className="card bg-primary text-primary-content overflow-hidden w-full md:w-128 rounded-3xl"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aous-delay="100"
          >
            <div className="card-title w-full bg-gradient-to-tr from-purple-900 to-violet-900 px-[1.5rem] py-2">
              Vision
            </div>
            <div className="card-body">
              <p>
                To be a pioneer in the protection of transparent, safe, and
                equitable land ownership rights by utilizing innovative
                technology to prevent land mafia practices and ensure legal
                certainty for every legitimate landowner.
              </p>
            </div>
          </div>
          <div
            className="card bg-primary text-primary-content overflow-hidden w-full md:w-128 rounded-3xl"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <div className="card-title w-full bg-gradient-to-tr from-purple-900 to-violet-900 px-[1.5rem] py-2">
              Mision
            </div>
            <div className="card-body">
              <p>
                Being a pioneer in efforts to protect and secure land ownership
                rights from the threat of the land mafia, by presenting a
                transparent, safe, and technology-based system to ensure justice
                for every legitimate landowner.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="">
        <article id="feature-1" className="max-w-6xl mx-auto p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <img src={feature1} alt="" className="h-82" />
            <div className="prose-lg flex flex-col justify-end text-end">
              <h2 className="font-bold">
                On-Chain Your Land Ownership with Smart Contract Technology
              </h2>
              <p className="text-gray-700">
                LandRanger allows you to secure your home or land ownership
                certificate using blockchain technology.
              </p>
            </div>
          </div>
        </article>
        <article id="feature-2" className="bg-gray-50/50">
          <div className="max-w-6xl mx-auto p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="prose-lg flex flex-col justify-center w-96 order-2 md:order-1">
                <h2 className="font-bold">Transfer Your Ownership Simply</h2>
                <p className="text-gray-700">
                  This technology makes it simpler for you to transfer ownership
                  of your home or land.
                </p>
              </div>
              <img src={feature2} alt="" className="h-56 md:order-2" />
            </div>
          </div>
        </article>
      </section>
      <section
        id="hiasan"
        className="hero h-80"
        style={{
          backgroundImage: `url(${hiasan})`, // use imported image
        }}
      >
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">
              Secure Land Certificates With LandRanger
            </h1>
            <p className="mb-5 text-gray-100">
              Use the advantages of ICP to secure land ownership
            </p>
          </div>
        </div>
      </section>
      <section id="faq" className="max-w-6xl mx-auto p-10 ">
        <h2 className="text-3xl font-bold mb-8">FAQ</h2>
        <div className="content space-y-4">
          {FAQData.map((faq, index) => (
            <div
              key={index}
              className="bg-base-100 border-base-300 collapse collapse-plus border"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-semibold bg-primary text-primary-content">
                {faq.question}
              </div>
              <div className="collapse-content">
                {Array.isArray(faq.answer) ? (
                  <ul className="list-disc pl-6 p-4 space-y-1">
                    {faq.answer.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4">{faq.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
