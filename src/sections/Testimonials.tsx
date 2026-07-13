import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlindsTextReveal } from "../utils/BlindsTextReveal";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Sono arrivato con un'idea vaga e ne è uscito un tatuaggio molto più forte di quanto immaginassi. Ascolto, bozza e risultato impeccabili.",
    author: "Marco",
    tattoo: "Manica custom",
  },
  {
    quote:
      "Studio pulito, professionale, atmosfera giusta. Mi sono sentita a mio agio dal primo minuto. Terzo tatuaggio qui, e non sarà l'ultimo.",
    author: "Giulia",
    tattoo: "Fine line",
  },
  {
    quote:
      "La cura dei dettagli è altissima. Il ritratto del mio cane è fedele alla foto e ha esattamente l'emozione che volevo.",
    author: "Alessandro",
    tattoo: "Ritratto",
  },
];

export default function Testimonials() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const timer = setTimeout(() => {
      const reveal = new BlindsTextReveal(heading, { bgColor: "#0A0A0A" });
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
    const cards = cardsRef.current;
    if (!cards) return;

    const cardEls = cards.querySelectorAll(".testimonial-card");
    gsap.from(cardEls, {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cards,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      style={{
        backgroundColor: "var(--color-black)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <h2
          ref={headingRef}
          className="testimonials-heading blinds-text js-blinds-text font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h1)",
            color: "var(--color-white)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          <span>COSA DICONO </span>
          <span style={{ color: "#DC2626" }}>DI NOI</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ marginTop: "var(--space-xl)" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "var(--space-lg)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--color-white)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-text-muted-dark)",
                  marginTop: "var(--space-sm)",
                }}
              >
                &mdash; {t.author}, {t.tattoo}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "var(--space-xl)" }}>
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block font-medium transition-colors duration-300 hover:bg-[#B91C1C]"
            style={{
              background: "var(--color-red)",
              color: "var(--color-white)",
              padding: "14px 36px",
              borderRadius: "100px",
              fontSize: "var(--text-nav)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Prenota il tuo tatuaggio
          </a>
        </div>
      </div>
    </section>
  );
}
