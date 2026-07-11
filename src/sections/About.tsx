import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlindsTextReveal } from "../utils/BlindsTextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Give the heading a brief moment to mount, then init BlindsTextReveal
    const timer = setTimeout(() => {
      const reveal = new BlindsTextReveal(heading, { bgColor: "#F5F0EB" });
      const words = reveal.getWords();

      gsap.fromTo(
        words,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          stagger: 0.05,
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onStart: () => reveal.animate(),
        }
      );
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    gsap.from(image, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--color-offwhite)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      {/* Section label */}
      <span
        className="absolute font-medium uppercase"
        style={{
          top: "var(--space-lg)",
          left: "var(--space-lg)",
          fontSize: "var(--text-label)",
          color: "var(--color-text-muted)",
          letterSpacing: "0.12em",
        }}
      >
        ABOUT
      </span>

      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {/* Decorative red dot */}
        <div
          className="hidden md:block absolute"
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--color-red)",
            left: "var(--space-lg)",
            top: "calc(var(--space-3xl) + 80px)",
          }}
        />

        {/* Text column */}
        <div className="md:col-span-3">
          <h1
            ref={headingRef}
            className="about-heading blinds-text js-blinds-text font-['Bebas_Neue'] uppercase"
            style={{
              fontSize: "var(--text-h1)",
              color: "var(--color-black)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              paddingLeft: "24px",
            }}
          >
            <span>AT BLITZ TATTOO, </span>
            <span style={{ color: "#DC2626" }}>WE DON&apos;T JUST CREATE TATTOOS, </span>
            <span>WE CRAFT MEANINGFUL, TIMELESS ART THAT TELLS YOUR STORY. WHETHER YOU&apos;RE LOOKING FOR BOLD, TRADITIONAL INK OR DELICATE, INTRICATE DESIGNS, OUR ARTISTS BRING THEIR UNIQUE EXPERTISE TO MAKE </span>
            <span style={{ color: "#DC2626" }}>YOUR VISION A REALITY.</span>
          </h1>
        </div>

        {/* Image column */}
        <div
          ref={imageRef}
          className="md:col-span-2"
          style={{ marginTop: "-4rem" }}
        >
          <img
            src="/about-artist.jpg"
            alt="Tattoo artist at work"
            className="w-full object-cover"
            style={{
              borderRadius: "8px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              aspectRatio: "3/4",
            }}
          />
        </div>
      </div>
    </section>
  );
}
