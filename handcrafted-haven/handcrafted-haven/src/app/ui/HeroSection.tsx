import React from 'react';

const HeroSection = () => {
  return (
    <>
      <section>
        <div>
          <div>
            <h1 className="text-4xl text-center">
              Discover Unique <span>Handcrafted</span> Treasures
            </h1>

            <p className="text-center">
              Handcrafted Haven connects passionate artisans with discerning
              buyers who appreciate the beauty, quality, and story behind every
              handmade creation. Join our thriving community of makers and
              collectors.
            </p>

            <div className="w-[600px] grid place-items-left grid-cols-2  grid-rows-2 gap-x-1 justify-self-center mb-10 mt-10">
              <div className="border p-2 col-start-1 col-end-2 row-start-1 row-end-2">
                <div>500+</div>
                <div>Artisans</div>
              </div>
              <div className="border p-2 col-start-1 col-end-2 row-start-2 row-end-3 ">
                <div>10K+</div>
                <div>Unique Items</div>
              </div>
              <div className="border p-2 col-start-2 col-end-3 row-start-1 row-end-2">
                <div>50K+</div>
                <div>Happy Customers</div>
              </div>
              <div className="border p-2 col-start-2 col-end-3 row-start-2 row-end-3">
                <div>4.9★</div>
                <div>Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
