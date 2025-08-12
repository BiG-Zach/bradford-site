import React from 'react';
import bg from '../assets/backgrounds/skyway-bridge-about.webp';

const About = () => {
  return (
    <section
      className="bg-cover bg-center py-20 text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center bg-black/60 p-10 rounded-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Bradford Informed Guidance</h2>
        <p className="text-lg">
          Founded on integrity and driven by results, we help clients across the country secure protection they can count on—while delivering the personal service they deserve.
        </p>
      </div>
    </section>
  );
};

export default About;
