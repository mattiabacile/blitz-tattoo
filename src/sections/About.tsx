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
    <section id="about" ref={sectionRef} className="about-section relative">
      <div className="about-inner mx-auto">
        <div className="about-intro grid grid-cols-1 items-start md:grid-cols-5">
          <div className="md:col-span-3">
            <span className="about-kicker">La nostra storia</span>
            <h2
              ref={headingRef}
              className="about-heading blinds-text js-blinds-text font-['Bebas_Neue'] uppercase"
            >
              <span>MODENA, 2015. </span>
              <span style={{ color: "#DC2626" }}>UNA SOLA IDEA: </span>
              <span>FARE OGNI LAVORO COME SE DOVESSE </span>
              <span style={{ color: "#DC2626" }}>RESTARE PER SEMPRE.</span>
            </h2>
          </div>

          <div className="about-story md:col-span-2">
            <p>
              Blitz nasce a Modena nel 2015 come studio indipendente, con una
              convinzione semplice: prima dell&apos;inchiostro viene l&apos;ascolto.
              Ogni progetto parte dalla persona, dal motivo che porta con sé e
              dal modo in cui quel segno dovrà vivere sulla pelle.
            </p>
            <p>
              Negli anni lo spazio è cresciuto insieme alle persone che lo
              abitano. Oggi riunisce mani e stili diversi, ma conserva lo stesso
              metodo: consulenza chiara, disegno su misura, igiene rigorosa e
              nessuna fretta di arrivare alla macchinetta.
            </p>
            <p className="about-story__note">
              Tatuaggi custom, piercing e consulenze su appuntamento.
            </p>
          </div>
        </div>

        <div ref={imageRef} className="about-media grid grid-cols-1 md:grid-cols-5">
          <figure className="about-media__main md:col-span-3">
            <img
              src="/studio-esterno.jpg"
              alt="La facciata di Blitz Tattoo a Modena, illuminata la sera"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Blitz Tattoo, Modena</figcaption>
          </figure>
          <figure className="about-media__secondary md:col-span-2">
            <img
              src="/studio-lounge.jpg"
              alt="La zona d'attesa di Blitz Tattoo con flash tradizionali alle pareti"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
