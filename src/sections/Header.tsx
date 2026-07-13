import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Studio", id: "about" },
    { label: "Servizi", id: "services" },
    { label: "Prenota", id: "booking" },
    { label: "Artisti", id: "artists" },
    { label: "Promo", id: "promotions" },
    { label: "FAQ", id: "faq" },
    { label: "Contatti", id: "footer" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          height: "80px",
          backgroundColor: scrolled ? "rgba(245, 240, 235, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div
          className="flex items-center justify-between h-full mx-auto px-6 md:px-10"
          style={{ maxWidth: "var(--container-max)" }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-['Bebas_Neue'] text-sm tracking-[0.12em] transition-colors duration-300"
            style={{ color: scrolled ? "var(--color-black)" : "var(--color-white)" }}
          >
            BLITZ TATTOO
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 font-['Bebas_Neue'] text-sm tracking-wider transition-colors duration-300 cursor-pointer"
            style={{ color: scrolled ? "var(--color-black)" : "var(--color-white)" }}
          >
            <span>MENU</span>
            <div className="flex flex-col gap-[5px]">
              <span
                className="block w-5 h-[2px] transition-all duration-300"
                style={{
                  backgroundColor: scrolled ? "var(--color-black)" : "var(--color-white)",
                  transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none",
                }}
              />
              <span
                className="block w-5 h-[2px] transition-all duration-300"
                style={{
                  backgroundColor: scrolled ? "var(--color-black)" : "var(--color-white)",
                  transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: "var(--color-black)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <nav className="flex flex-col items-center gap-6 md:gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-wide transition-colors duration-300 hover:text-[#DC2626] cursor-pointer"
              style={{
                color: "var(--color-white)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${menuOpen ? i * 50 : 0}ms, transform 0.4s ease ${menuOpen ? i * 50 : 0}ms, color 0.25s ease`,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
