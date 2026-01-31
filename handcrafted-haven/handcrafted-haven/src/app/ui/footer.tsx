import Image from "next/image";

export default function Footer() {
  const buildDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer>
      

        <div>

          <p>
            © {new Date().getFullYear()} Handcrafted Haven · Last updated {buildDate}
          </p>

          <div className="flex justify-self-center justify-around w-[200px]">
            <a href="#" aria-label="Instagram">
              <Image
                alt="Instagram icon"
                src="/icons/instagram.png"
                width={28}
                height={28}
              />
            </a>

            <a href="#" aria-label="X / Twitter">
              <Image
                alt="X icon"
                src="/icons/X.png"
                width={28}
                height={28}
              />
            </a>

            <a href="#" aria-label="WhatsApp">
              <Image
                alt="WhatsApp icon"
                src="/icons/whats.png"
                width={28}
                height={28}
              />
            </a>
          </div>
        </div>

        <div>
          Crafted with care · Supporting artisans worldwide
        </div>
      
    </footer>
  );
}
