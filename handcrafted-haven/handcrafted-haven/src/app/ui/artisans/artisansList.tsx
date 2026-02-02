import Image from "next/image";

export default function ArtisansList() {
  //creating an object to keep the artisans
  interface Artisan {
    artisans: {
      path: string;
      name: string;
    speciality: string;
    email: string;
    history: string;
    }[];
    }
    
    const artisans: Artisan = {
      artisans: [
        {
          path: "/images/artisans/Andre.png",
          name: "André Oliveira",
          speciality: "Ceramic Pottery",
          email: "andre.oliveira@artisans.com",
          history:
            "Third-generation ceramicist from São Paulo. Trained under master potters in Portugal before opening his own studio. Known for blending traditional Brazilian motifs with contemporary designs. His work has been featured in galleries across South America.",
        },
        {
          path: "/images/artisans/Anna.png",
          name: "Anna Chen",
          speciality: "Textile Weaving",
          email: "anna.chen@artisans.com",
          history:
            "Self-taught weaver who discovered her passion while traveling through Southeast Asia. Specializes in sustainable fabrics using natural dyes. Founded a cooperative supporting women artisans in rural communities. Her tapestries hang in private collections worldwide.",
        },
        {
          path: "/images/artisans/Caio.png",
          name: "Caio Williams",
          speciality: "Woodworking",
          email: "caio.williams@artisans.com",
          history:
            "Former architect turned furniture maker, combining structural precision with artistic expression. Works exclusively with reclaimed wood from historic buildings. Each piece tells a story of its material's past life. Winner of the National Craft Excellence Award.",
        },
        {
          path: "/images/artisans/Deborah.png",
          name: "Deborah Mensah",
          speciality: "Jewelry Design",
          email: "deborah.mensah@artisans.com",
          history:
            "Goldsmith apprenticed in Ghana's Ashanti region, now based in Brooklyn. Creates pieces inspired by African symbolism and modern minimalism. Her ethical sourcing practices have set industry standards. Featured in Vogue and Harper's Bazaar.",
        },
        {
          path: "/images/artisans/Helena.png",
          name: "Helena Park",
          speciality: "Glassblowing",
          email: "helena.park@artisans.com",
          history:
            "Studied traditional glassmaking in Murano, Italy for five years. Known for her luminous sculptures that play with light and color. Teaches masterclasses at art institutes across the country. Recently completed a public installation for the city museum.",
        },
        {
          path: "/images/artisans/Jake.png",
          name: "Jake Morrison",
          speciality: "Leathercraft",
          email: "jake.morrison@artisans.com",
          history:
            "Fourth-generation leather artisan from Montana. Combines traditional saddlery techniques with contemporary fashion sensibilities. Supplies bespoke items to luxury brands and independent clients alike. His workshop hosts apprentices from around the world.",
        },
      ],
    };
    
    
  return (
    <>
      <p>List of artisans</p>

      {artisans.artisans.map((artisan, index) => (
        <section
          key={index}
          className="w-full grid place-items-start grid-cols-[auto_1fr] mb-10 gap-4 "
        >
          <Image
            src={artisan.path}
            alt={artisan.name}
            key={index}
            width={500}
            height={400}
            className="col-start-1 col-end-2 "
          />
          <section>
          <h1 className="bg-red-50 col-start-2 col-end-3 text-4xl">{artisan.name}</h1>
            <p className="col-start-2 col-end-3">{artisan.history}</p>
            <br />
            <p className="col-start-2 col-end-3">{artisan.email}</p>
          </section>
        </section>
      ))}
    </>
  );
}