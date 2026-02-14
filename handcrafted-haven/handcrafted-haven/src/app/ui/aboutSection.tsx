export default function AboutSection() {
  return (
    <section className="relative bg-[#f8f5f2] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#e2cdb420,_transparent_40%)]"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Section Label */}
        <p className="text-sm uppercase tracking-widest text-[#6B4F3F] mb-4">
          Our Story
        </p>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3e2c23] mb-6 sm:mb-8">
          About Handcrafted Haven
        </h2>


        {/* Decorative Divider */}
        <div className="w-24 h-1 bg-[#e2cdb4] mx-auto mb-10 rounded-full"></div>

        {/* Paragraph */}
        <p className="text-center text-base sm:text-lg leading-relaxed pb-5">
          Handcrafted Haven was born from a love for things made slowly,
          thoughtfully, and with heart. We believe every handmade piece carries
          a story, shaped by skilled hands and careful attention to detail. Our
          space celebrates craftsmanship, creativity, and the beauty of
          imperfection. Here, quality always matters more than speed. We work
          with independent makers who value tradition while embracing modern
          design. Each item is curated to bring warmth, authenticity, and
          character into everyday life. From small decorative pieces to
          meaningful gifts, everything is chosen with intention. Handcrafted
          Haven is a place where craft meets comfort.
        </p>
      </div>
    </section>
  );
}
