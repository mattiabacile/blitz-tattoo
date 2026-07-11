import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlindsTextReveal } from "../utils/BlindsTextReveal";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How do I book a tattoo session?",
    a: "You can book directly through our website using the form above, call us at +39 06 1234 5678, or stop by the studio. Walk-ins are welcome every Wednesday.",
  },
  {
    q: "What should I consider before getting a tattoo?",
    a: "Make sure you're certain about the design and placement. Avoid alcohol 24 hours before your session. Eat a good meal beforehand, and wear comfortable clothing that gives easy access to the area being tattooed.",
  },
  {
    q: "How long does each tattoo session last?",
    a: "Small tattoos can take 1-2 hours. Medium pieces typically take 3-4 hours. Full sessions for large work can run 5-7 hours. We'll give you a time estimate during your consultation.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "We require a \u20AC50 deposit to secure your booking. The remaining balance is due on the day of your session. For larger pieces over \u20AC500, we can arrange a two-payment plan.",
  },
  {
    q: "What styles and techniques are available at the studio?",
    a: "We cover traditional American, neo-traditional, fine line, minimalist, blackwork, realism, portraits, Japanese, geometric, and custom illustrative work. Each artist has their specialty \u2014 check our Artists section.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const timer = setTimeout(() => {
      const reveal = new BlindsTextReveal(heading, { bgColor: "#E8E0D8" });
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
    const items = itemsRef.current;
    if (!items) return;

    const itemEls = items.querySelectorAll(".faq-item");
    gsap.from(itemEls, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: items,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        backgroundColor: "var(--color-gray-warm)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-narrow)" }}>
        <h2
          ref={headingRef}
          className="faq-heading blinds-text js-blinds-text font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h2)",
            color: "var(--color-black)",
            marginBottom: "var(--space-xl)",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
          }}
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div ref={itemsRef} className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                background: "var(--color-white)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
                style={{
                  padding: "var(--space-md) var(--space-lg)",
                  background: "none",
                  border: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-body-lg)",
                    color: "var(--color-black)",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    paddingRight: "1rem",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: "var(--color-red)",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0)",
                    fontSize: "20px",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="transition-all duration-400"
                style={{
                  maxHeight: openIndex === i ? "300px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                <p
                  style={{
                    padding: "0 var(--space-lg) var(--space-md)",
                    fontSize: "var(--text-body)",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
