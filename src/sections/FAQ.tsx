import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlindsTextReveal } from "../utils/BlindsTextReveal";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Come prenoto una sessione?",
    a: "Puoi compilare il form, chiamarci al +39 059 123 4567 o passare direttamente in studio a Modena. Il mercoledì accogliamo anche walk-in.",
  },
  {
    q: "Cosa devo fare prima di tatuarmi?",
    a: "Arriva riposato, mangia qualcosa prima della seduta ed evita alcol nelle 24 ore precedenti. Indossa vestiti comodi che lascino libera la zona da tatuare.",
  },
  {
    q: "Quanto dura una sessione?",
    a: "Un tatuaggio piccolo può richiedere 1-2 ore, un pezzo medio circa 3-4. I lavori grandi possono arrivare a 5-7 ore. Ti diamo una stima precisa in consulenza.",
  },
  {
    q: "Serve un acconto?",
    a: "Sì, chiediamo \u20AC50 per confermare la prenotazione. Il saldo si paga il giorno della sessione. Per progetti sopra i \u20AC500 possiamo dividere il pagamento in due tranche.",
  },
  {
    q: "Quali stili realizzate?",
    a: "Lavoriamo su tradizionale, neo-traditional, fine line, minimal, blackwork, realismo, ritratti, giapponese, geometrico e illustrazione custom. In consulenza ti indirizziamo verso l'artista più adatto.",
  },
  {
    q: "Fate anche piercing?",
    a: "Sì. Eseguiamo piercing con materiale sterile e gioielli adatti alla prima guarigione. Ti seguiamo anche per controlli, cambio gioiello e cura dopo il piercing.",
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
          DOMANDE FREQUENTI
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
