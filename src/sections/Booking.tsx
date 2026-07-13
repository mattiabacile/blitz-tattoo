import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initFallingText } from "../utils/fallingText";

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initFallingText(".js-falling-text", 0.02);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    gsap.from(form, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: form,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--color-offwhite)",
    border: "1px solid transparent",
    borderRadius: "8px",
    padding: "14px 16px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "var(--text-body)",
    color: "var(--color-black)",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "var(--text-label)",
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 500,
    marginBottom: "6px",
    display: "block",
  };

  return (
    <section
      id="booking"
      style={{
        backgroundColor: "var(--color-gray-warm)",
        padding: "var(--space-3xl) var(--space-lg)",
        position: "relative",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-narrow)" }}>
        <h2
          ref={headingRef}
          className="booking-heading js-falling-text falling-text font-['Bebas_Neue'] uppercase text-center"
          style={{
            fontSize: "var(--text-h1)",
            color: "var(--color-black)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          RACCONTACI LA TUA IDEA: <span style={{ color: "#DC2626" }}>LA TRASFORMIAMO</span> IN UN TATUAGGIO.
        </h2>

        <div
          className="mx-auto"
          style={{
            marginTop: "var(--space-xl)",
            background: "var(--color-white)",
            padding: "var(--space-lg)",
            borderRadius: "12px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <p
                className="font-['Bebas_Neue'] uppercase"
                style={{
                  fontSize: "var(--text-h3)",
                  color: "var(--color-red)",
                }}
              >
                Grazie!
              </p>
              <p
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--color-text-muted)",
                  marginTop: "var(--space-sm)",
                }}
              >
                Abbiamo ricevuto la richiesta. Ti rispondiamo entro 24 ore per definire idea, tempi e prossimo passo.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Row 1: First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Nome</label>
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#DC2626";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Cognome</label>
                  <input
                    type="text"
                    placeholder="Il tuo cognome"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#DC2626";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Telefono</label>
                  <input
                    type="tel"
                    placeholder="+39 3XX XXX XXXX"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#DC2626";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="nome@esempio.it"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#DC2626";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label style={labelStyle}>Che tatuaggio hai in mente?</label>
                <textarea
                  rows={4}
                  placeholder="Descrivi idea, stile, punto del corpo e dimensione indicativa..."
                  required
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "100px",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#DC2626";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Row 4: Date */}
              <div>
                <label style={labelStyle}>Data preferita</label>
                <input
                  type="date"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#DC2626";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="self-start font-medium transition-colors duration-300 hover:bg-[#B91C1C] cursor-pointer"
                style={{
                  background: "var(--color-red)",
                  color: "var(--color-white)",
                  padding: "16px 40px",
                  borderRadius: "100px",
                  fontSize: "var(--text-nav)",
                  fontFamily: "'Inter', sans-serif",
                  border: "none",
                }}
              >
                Invia la richiesta
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
