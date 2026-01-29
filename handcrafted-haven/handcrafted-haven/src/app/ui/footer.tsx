import Image from "next/image";

export default function Footer() {
  const buildDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-10">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Branding / copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Handcrafted Haven · Last updated {buildDate}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                alt="Instagram icon"
                src="/icons/instagram.png"
                width={28}
                height={28}
              />
            </a>

            <a
              href="#"
              aria-label="X / Twitter"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                alt="X icon"
                src="/icons/X.png"
                width={28}
                height={28}
              />
            </a>

            <a
              href="#"
              aria-label="WhatsApp"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                alt="WhatsApp icon"
                src="/icons/whats.png"
                width={28}
                height={28}
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          Crafted with care · Supporting artisans worldwide
        </div>
      </div>
    </footer>
  );
}
