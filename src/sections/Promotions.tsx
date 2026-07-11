import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const promotions = [
  {
    title: "WALK IN DAY",
    description:
      "Every Wednesday, walk-ins get 15% off any same-day appointment. No booking required \u2014 just show up and get inked.",
    cta: "Find us on the map",
  },
  {
    title: "CLUB CARD",
    description:
      "Your 5th tattoo is 50% off. Collect stamps with every session and watch the savings stack up.",
    cta: "Ask at the studio",
  },
  {
    title: "CERTIFICATE FOR A GIFT",
    description:
      "Give the gift of permanent art. Our gift certificates start at \u20AC50 and never expire.",
    cta: "Buy a certificate",
  },
];

export default function Promotions() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    gsap.from(heading, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const cardEls = cards.querySelectorAll(".promo-card");
    gsap.from(cardEls, {
      opacity: 0,
      x: -40,
      stagger: 0.15,
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
      id="promotions"
      style={{
        backgroundColor: "var(--color-black)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <h2
          ref={headingRef}
          className="font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h2)",
            color: "var(--color-white)",
            marginBottom: "var(--space-xl)",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
          }}
        >
          PROMOTIONS
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {promotions.map((promo, i) => (
            <div
              key={i}
              className="promo-card"
              style={{
                background: "var(--color-black-soft)",
                padding: "var(--space-lg)",
                borderRadius: "16px",
                borderLeft: "4px solid var(--color-red)",
              }}
            >
              <h3
                className="font-['Bebas_Neue'] uppercase"
                style={{
                  fontSize: "var(--text-h3)",
                  color: "var(--color-white)",
                  letterSpacing: "-0.02em",
                }}
              >
                {promo.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-muted-dark)",
                  marginTop: "var(--space-sm)",
                  lineHeight: 1.5,
                }}
              >
                {promo.description}
              </p>
              <span
                className="inline-flex items-center gap-2 font-medium transition-all duration-300 hover:underline cursor-pointer"
                style={{
                  color: "var(--color-red)",
                  fontSize: "var(--text-nav)",
                  marginTop: "var(--space-md)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {promo.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
