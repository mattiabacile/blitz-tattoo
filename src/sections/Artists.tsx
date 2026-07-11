import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initFallingText } from "../utils/fallingText";

gsap.registerPlugin(ScrollTrigger);

const artists = [
  {
    name: "JAKE BENNETT",
    image: "/artist-jake.jpg",
    specialty: "Traditional & Neo-Traditional",
    bio: "15 years of bold lines, saturated color, and classic American tattoo traditions.",
  },
  {
    name: "SOPHIA REED",
    image: "/artist-sophia.jpg",
    specialty: "Fine Line & Minimalist",
    bio: "Delicate, precise work that speaks volumes through subtle detail and negative space.",
  },
  {
    name: "EMILY CARTER",
    image: "/artist-emily.jpg",
    specialty: "Realism & Portraits",
    bio: "Photographic precision in black-and-gray. If you can imagine it, she can ink it.",
  },
];

export default function Artists() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      initFallingText(".js-artists-heading", 0.02);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".artist-card");
    gsap.from(cards, {
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      id="artists"
      style={{
        backgroundColor: "var(--color-offwhite)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <h2
          className="js-artists-heading falling-text font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h1)",
            color: "var(--color-black)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          THOSE WHO WILL CREATE FUTURE <span style={{ color: "#DC2626" }}>MASTERPIECES</span> FOR YOU
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ marginTop: "var(--space-xl)" }}
        >
          {artists.map((artist, i) => (
            <div key={i} className="artist-card group">
              <div className="relative overflow-hidden" style={{ borderRadius: "12px" }}>
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ aspectRatio: "3/4" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "rgba(220,38,38,0.1)" }}
                />
              </div>
              <h3
                className="font-['Bebas_Neue'] uppercase"
                style={{
                  fontSize: "var(--text-h3)",
                  color: "var(--color-black)",
                  marginTop: "var(--space-md)",
                  letterSpacing: "-0.02em",
                }}
              >
                {artist.name}
              </h3>
              <p
                className="font-medium uppercase"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--color-red)",
                  letterSpacing: "0.08em",
                  marginTop: "var(--space-xs)",
                }}
              >
                {artist.specialty}
              </p>
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-text-muted)",
                  marginTop: "var(--space-xs)",
                  lineHeight: 1.5,
                }}
              >
                {artist.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
