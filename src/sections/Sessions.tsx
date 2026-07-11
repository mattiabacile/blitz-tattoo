import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sessions = [
  {
    title: "FULL SESSION",
    image: "/session-full.jpg",
    description: "For large-scale pieces, full back, chest, or sleeve work.",
    price: "FROM \u20AC300",
  },
  {
    title: "MEDIUM TATTOOS",
    image: "/session-medium.jpg",
    description: "Perfect for forearm pieces, calf work, or detailed medium designs.",
    price: "FROM \u20AC150",
  },
  {
    title: "SMALL TATTOOS",
    image: "/session-small.jpg",
    description: "Minimal designs, symbols, lettering, and small custom pieces.",
    price: "FROM \u20AC60",
  },
];

export default function Sessions() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const cardElements = cards.querySelectorAll(".session-card");
    gsap.from(cardElements, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.7,
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
        backgroundColor: "var(--color-offwhite)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <h2
          className="font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h2)",
            color: "var(--color-black)",
            marginBottom: "var(--space-xl)",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
          }}
        >
          CHOOSE YOUR SESSION
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {sessions.map((session, i) => (
            <div
              key={i}
              className="session-card"
              style={{
                background: "var(--color-black-soft)",
                padding: "var(--space-lg)",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={session.image}
                alt={session.title}
                className="w-full object-cover"
                style={{ aspectRatio: "16/10", borderRadius: "8px" }}
              />
              <h3
                className="font-['Bebas_Neue'] uppercase"
                style={{
                  fontSize: "var(--text-h3)",
                  color: "var(--color-white)",
                  marginTop: "var(--space-md)",
                  letterSpacing: "-0.02em",
                }}
              >
                {session.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-text-muted-dark)",
                  marginTop: "var(--space-xs)",
                  lineHeight: 1.5,
                }}
              >
                {session.description}
              </p>
              <p
                className="font-['Bebas_Neue']"
                style={{
                  fontSize: "var(--text-h3)",
                  color: "var(--color-red)",
                  marginTop: "var(--space-sm)",
                }}
              >
                {session.price}
              </p>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-block mt-4 font-medium transition-all duration-300 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626]"
                style={{
                  border: "1px solid #DC2626",
                  color: "#DC2626",
                  padding: "8px 20px",
                  borderRadius: "100px",
                  fontSize: "var(--text-nav)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Book now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
