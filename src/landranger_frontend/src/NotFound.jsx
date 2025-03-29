import React from 'react';
import { useLocation } from 'react-router';
import NotFoundImg from './assets/404.png';

const NotFound = () => {
  let location = useLocation();

  return (
    <section className="flex flex-col my-8 justify-center items-center max-w-6xl mx-auto">
      <div
        id="forbidden-img"
        className="size-72 md:size-128 bg-center"
        style={{
          backgroundImage: `url(${NotFoundImg})`, // use imported image
          backgroundSize: 'cover',
        }}
      ></div>
      <h2 className="props text-center">
        No match for <code>{location.pathname}</code>
      </h2>
    </section>
  );
};

export default NotFound;
