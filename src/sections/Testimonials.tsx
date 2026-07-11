import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlindsTextReveal } from "../utils/BlindsTextReveal";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Blitz Tattoo turned my vague idea into something I couldn't have imagined. The artist listened, sketched, and delivered beyond expectations.",
    author: "Marco",
    tattoo: "Custom Sleeve",
  },
  {
    quote:
      "Clean, professional, and the atmosphere is incredible. I felt comfortable from the moment I walked in. My third tattoo here and counting.",
    author: "Giulia",
    tattoo: "Minimalist Design",
  },
  {
    quote:
      "The attention to detail is unmatched. They matched the photo of my dog perfectly \u2014 it's like he's always with me now.",
    author: "Alessandro",
    tattoo: "Portrait Work",
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
          <span>WHAT OUR CLIENTS SAY </span>
          <span style={{ color: "#DC2626" }}>ABOUT US</span>
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
            Book your tattoo
          </a>
        </div>
      </div>
    </section>
  );
}
