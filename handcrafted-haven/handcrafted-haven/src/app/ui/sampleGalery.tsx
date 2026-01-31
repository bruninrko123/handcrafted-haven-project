"use client";
import Image from "next/image";
import { useState } from "react";

export default function SampleGalery() {
  const [firstImgIndex, setFirstImgIndex] = useState(0);
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
      <section className="relative flex">
        <section className="flex w-full">
          {myGallery.images
            .slice(firstImgIndex, firstImgIndex + 3)
            .map((image, index) => (
              <Image
                src={image.path}
                alt={image.title}
                key={index}
                width={500}
                height={400}
              />
            ))}
        </section>
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl border rounded-3xl bg-blue-300 p-3"
        >
          {`<<`}
        </button>
        <button
          onClick={handleNext}
          className="absolute right-7 top-1/2 -translate-y-1/2 text-3xl rounded-3xl bg-blue-300 p-3"
        >
          {`>>`}
        </button>
      </section>
    </>
  );
}
