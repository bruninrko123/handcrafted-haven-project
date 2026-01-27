import Image from "next/image";

export default function Footer() {

    const buildDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (
      <>
        <p>Last updated: {buildDate} </p>

        <Image
          alt="Instagram icon"
          src="/icons/instagram.png"
          width={30}
          height={30}
        />

        <Image
          alt="Instagram icon"
          src="/icons/X.png"
          width={30}
          height={30}
        />

        <Image
          alt="Instagram icon"
          src="/icons/whats.png"
          width={30}
          height={30}
        />
      </>
    );
};