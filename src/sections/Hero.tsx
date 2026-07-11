import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Typewriter effect
    const target = typewriterRef.current;
    if (!target) return;

    const text = target.getAttribute("data-text") || "";
    const cursor = target.querySelector(".cursor") as HTMLElement;
    let i = 0;
    const speed = 100;

    target.textContent = "";
    if (cursor) target.appendChild(cursor);

    const typeWriter = () => {
      if (i < text.length) {
        const char = document.createTextNode(text.charAt(i));
        target.insertBefore(char, cursor);
        i++;
        setTimeout(typeWriter, speed + Math.random() * 50);
      }
    };

    const timer = setTimeout(typeWriter, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Video intersection observer
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Background image */}
      <img
        src="/hero-background.jpg"
        alt="Blitz Tattoo Studio Interior"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.6) 100%)",
        }}
      />

      {/* Video overlay */}
      <div
        ref={containerRef}
        className="absolute hidden md:block"
        style={{
          top: "12vh",
          right: "8vw",
          width: "22vw",
          maxWidth: "340px",
          aspectRatio: "6/5",
          zIndex: 10,
          borderRadius: "4px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 60px rgba(220, 38, 38, 0.3)",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src="/hero-tattoo-machine.mp4"
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "multiply", filter: "brightness(0.8)" }}
        />
      </div>

      {/* Typewriter text */}
      <div
        ref={typewriterRef}
        className="hero-typewriter absolute"
        data-text="WHERE INK MEETS ARTISTRY"
        style={{
          top: "18vh",
          left: "4vw",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)",
          letterSpacing: "0.2em",
          color: "#FAFAFA",
          textTransform: "uppercase",
          zIndex: 20,
        }}
      >
        <span
          className="cursor inline-block"
          style={{
            width: "2px",
            height: "1.1em",
            backgroundColor: "#DC2626",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            animation: "blink 0.8s step-end infinite",
          }}
        />
      </div>

      {/* BLITZ heading */}
      <h1
        className="absolute font-['Bebas_Neue'] leading-[0.9] tracking-[-0.02em] uppercase"
        style={{
          left: "4vw",
          top: "28vh",
          fontSize: "var(--text-hero)",
          color: "#DC2626",
          textShadow: "0 0 80px rgba(220, 38, 38, 0.5)",
          zIndex: 10,
        }}
      >
        BLITZ
      </h1>

      {/* Subtext */}
      <p
        className="absolute hidden md:block"
        style={{
          left: "4vw",
          bottom: "18vh",
          maxWidth: "320px",
          fontSize: "var(--text-body-sm)",
          color: "#FAFAFA",
          lineHeight: 1.6,
          zIndex: 10,
          opacity: 0,
          transform: "translateY(20px)",
          animation: "fadeSlideUp 0.6s ease forwards 4.5s",
        }}
      >
        Our experienced team specializes in custom designs, cover-ups, and piercings. Walk-ins welcome.
      </p>

      {/* CTA Button */}
      <a
        href="#booking"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute inline-block font-medium transition-all duration-300 hover:bg-white hover:text-black"
        style={{
          left: "4vw",
          bottom: "10vh",
          zIndex: 10,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.4)",
          color: "#FAFAFA",
          padding: "10px 24px",
          borderRadius: "100px",
          fontSize: "var(--text-nav)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Book your tattoo
      </a>

      {/* TATTOO heading */}
      <h1
        className="absolute font-['Bebas_Neue'] leading-[0.9] tracking-[-0.02em] uppercase"
        style={{
          right: "6vw",
          bottom: "15vh",
          fontSize: "var(--text-hero)",
          color: "#DC2626",
          textShadow: "0 0 80px rgba(220, 38, 38, 0.5)",
          zIndex: 10,
        }}
      >
        TATTOO
      </h1>

      {/* Scroll indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ bottom: "3vh", zIndex: 10, animation: "bounce 2s infinite" }}
      >
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{ opacity: 0.5 }}
        >
          <path
            d="M8 4V20M8 20L2 14M8 20L14 14"
            stroke="#FAFAFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
