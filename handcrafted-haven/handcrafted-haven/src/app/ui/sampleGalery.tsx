"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SampleGalery() {
  const [firstImgIndex, setFirstImgIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  interface Gallery {
    images: {
      path: string;
      title: string;
      author: string;
    }[];
  }
  const myGallery: Gallery = {
    images: [
      {
        path: "/images/gallery/bowl.png",
        title: "Handcrafted Ceramic Bowl",
        author: "Elena Vasquez",
      },
      {
        path: "/images/gallery/car.png",
        title: "Vintage Wooden Car Model",
        author: "Thomas Woodward",
      },
      {
        path: "/images/gallery/keychain.png",
        title: "Hot Air Balloon Keychain",
        author: "Marie Laurent",
      },
      {
        path: "/images/gallery/lion.png",
        title: "Carved Wooden Lion",
        author: "Samuel Okonkwo",
      },
      {
        path: "/images/gallery/tower.png",
        title: "Miniature Fairy Tower",
        author: "Ingrid Svensson",
      },
      {
        path: "/images/gallery/wallet.png",
        title: "Tooled Leather Wallet",
        author: "Ricardo Montoya",
      },
    ],
  };

  function handleNext() {
    if (firstImgIndex < myGallery.images.length - 3)
      setFirstImgIndex(firstImgIndex + 1);
  }

  function handlePrevious() {
    if (firstImgIndex > 0) setFirstImgIndex(firstImgIndex - 1);
  }

  return (
    <>
      {/* populaing the gallery */}
      {}
      <section className="relative py-16 bg-[#f8f5f2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          {/* Gallery Grid */}
          <div className="flex gap-6 justify-center transition-all duration-200">
            {myGallery.images
              .slice(firstImgIndex, firstImgIndex + 3)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative group w-[300px] h-[350px] rounded-2xl overflow-hidden shadow-lg bg-white"
                >
                  <Image
                    src={image.path}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                    <h3 className="font-semibold text-lg">
                      {image.title}
                    </h3>
                    <p className="text-sm text-gray-200">
                      by {image.author}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg hover:scale-110 transition"
          >
            &larr;
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg hover:scale-110 transition"
          >
            &rarr;
          </button>
        </div>
      </section>
    </>
  );
}
