import { useEffect, useRef } from "react";
import { ScrollBlurFade } from "../utils/ScrollBlurFade";

const services = [
  "Signature Ink",
  "Ink Concept",
  "Dynamic Designs",
  "Cinematic Tattoos",
  "3D Ink Mastery",
  "Soundwave Tattoos",
  "Digital Ink",
  "Photo-Realistic Art",
  "Iconic Creations",
  "Packaged Ink",
  "Ad-Inspired Tattoos",
  "Brand Art Tattoos",
];

export default function Services() {
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const blurFadeRef = useRef<ScrollBlurFade | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const blurFade = new ScrollBlurFade(list);
    blurFadeRef.current = blurFade;

    // Use IntersectionObserver to only run the effect when visible
    const section = sectionRef.current;
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            blurFade.toggle(entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(section);
      return () => {
        observer.disconnect();
        blurFade.destroy();
      };
    }

    return () => blurFade.destroy();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--color-black)",
        padding: "var(--space-2xl) 0",
        position: "relative",
        minHeight: "150vh",
      }}
    >
      {/* Section label */}
      <span
        className="absolute font-medium uppercase"
        style={{
          top: "var(--space-lg)",
          right: "var(--space-lg)",
          fontSize: "var(--text-label)",
          color: "var(--color-text-muted-dark)",
          letterSpacing: "0.12em",
        }}
      >
        SERVICES
      </span>

      <div className="flex flex-col items-center" style={{ padding: "0 var(--space-lg)" }}>
        <h2
          className="font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h2)",
            color: "var(--color-white)",
            marginBottom: "var(--space-xl)",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
          }}
        >
          WHAT WE DO
        </h2>

        <ul ref={listRef} className="services-list">
          {services.map((service, i) => (
            <li key={i}>{service}</li>
          ))}
        </ul>

        <a
          href="#booking"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-block mt-16 font-medium transition-all duration-300 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626]"
          style={{
            border: "1px solid #DC2626",
            color: "#DC2626",
            padding: "10px 24px",
            borderRadius: "100px",
            fontSize: "var(--text-nav)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          See all services
        </a>
      </div>
    </section>
  );
}
