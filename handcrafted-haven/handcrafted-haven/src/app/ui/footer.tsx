import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-[#d9c8b8] bg-[#f5e6d3] text-[#4b3526]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 py-6 text-center sm:text-left">
        <p className="text-sm font-medium">(c) {currentYear} Handcrafted Haven</p>

        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="https://www.instagram.com/"
            aria-label="Instagram"
            className="opacity-90 transition hover:opacity-100"
          >
            <Image
              alt="Instagram icon"
              src="/icons/instagram.png"
              width={28}
              height={28}
            />
          </a>

          <a
            href="https://x.com/?lang=es"
            aria-label="X / Twitter"
            className="opacity-90 transition hover:opacity-100"
          >
            <Image alt="X icon" src="/icons/X.png" width={28} height={28} />
          </a>

          <a
            href="https://www.whatsapp.com/?lang=es"
            aria-label="WhatsApp"
            className="opacity-90 transition hover:opacity-100"
          >
            <Image alt="WhatsApp icon" src="/icons/whats.png" width={28} height={28} />
          </a>
        </div>

        <p className="text-sm text-[#6b4f3f]">
          Crafted with care. Supporting artisans worldwide.
        </p>
      </div>
    </footer>
  );
}
