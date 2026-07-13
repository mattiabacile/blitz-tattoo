import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const cols = content.querySelectorAll(".footer-col");
    gsap.from(cols, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "var(--color-black)",
        padding: "var(--space-2xl) var(--space-lg) var(--space-lg)",
      }}
    >
      <div
        ref={contentRef}
        className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        style={{ maxWidth: "var(--container-max)" }}
      >
        {/* Brand */}
        <div className="footer-col">
          <h3
            className="font-['Bebas_Neue'] uppercase"
            style={{
              fontSize: "var(--text-h3)",
              color: "var(--color-white)",
              letterSpacing: "-0.02em",
            }}
          >
            BLITZ TATTOO
          </h3>
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--color-text-muted-dark)",
              marginTop: "var(--space-sm)",
              lineHeight: 1.5,
            }}
          >
            Tatuaggi custom e piercing a Modena, dal 2015.
          </p>
        </div>

        {/* Address */}
        <div className="footer-col">
          <span
            className="font-medium uppercase block"
            style={{
              fontSize: "var(--text-label)",
              color: "var(--color-text-muted-dark)",
              letterSpacing: "0.08em",
              marginBottom: "var(--space-sm)",
            }}
          >
            INDIRIZZO
          </span>
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--color-white)",
              lineHeight: 1.7,
            }}
          >
            Via Emilia Centro 127
            <br />
            41121 Modena MO
            <br />
            Italia
          </p>
        </div>

        {/* Hours */}
        <div className="footer-col">
          <span
            className="font-medium uppercase block"
            style={{
              fontSize: "var(--text-label)",
              color: "var(--color-text-muted-dark)",
              letterSpacing: "0.08em",
              marginBottom: "var(--space-sm)",
            }}
          >
            ORARI
          </span>
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--color-white)",
              lineHeight: 1.7,
            }}
          >
            Lun&ndash;Sab: 10:00 &ndash; 20:00
            <br />
            Dom: 12:00 &ndash; 18:00
            <br />
            Walk-in mer: 10:00 &ndash; 22:00
          </p>
        </div>

        {/* Social */}
        <div className="footer-col">
          <span
            className="font-medium uppercase block"
            style={{
              fontSize: "var(--text-label)",
              color: "var(--color-text-muted-dark)",
              letterSpacing: "0.08em",
              marginBottom: "var(--space-sm)",
            }}
          >
            SEGUICI
          </span>
          <div className="flex flex-col gap-2">
            {["Instagram", "Facebook", "TikTok"].map((social) => (
              <span
                key={social}
                className="transition-colors duration-300 hover:text-[#DC2626] cursor-pointer"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-white)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          maxWidth: "var(--container-max)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "var(--space-xl)",
          paddingTop: "var(--space-md)",
        }}
      >
        <p
          style={{
            fontSize: "var(--text-body-sm)",
            color: "var(--color-text-muted-dark)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          &copy; 2026 Blitz Tattoo. Tutti i diritti riservati.
        </p>
        <div className="flex gap-4">
          {["Privacy", "Termini"].map((text, i) => (
            <span
              key={text}
              className="transition-colors duration-300 hover:text-white cursor-pointer"
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--color-text-muted-dark)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {i > 0 && <span className="mr-4">|</span>}
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Large decorative BLITZ TATTOO text */}
      <div
        className="mx-auto overflow-hidden text-center select-none pointer-events-none"
        style={{
          maxWidth: "var(--container-max)",
          marginTop: "var(--space-2xl)",
        }}
      >
        <span
          className="font-['Bebas_Neue'] uppercase block leading-none"
          style={{
            fontSize: "clamp(4rem, 12vw, 14rem)",
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.02em",
          }}
        >
          BLITZ TATTOO
        </span>
      </div>
    </footer>
  );
}
