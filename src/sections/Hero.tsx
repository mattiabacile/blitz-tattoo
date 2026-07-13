import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = typewriterRef.current;
    if (!target) return;

    const text = target.getAttribute("data-text") || "";
    const cursor = target.querySelector(".cursor") as HTMLElement;
    let i = 0;
    let cancelled = false;
    const speed = 100;

    target.textContent = "";
    if (cursor) target.appendChild(cursor);

    const typeWriter = () => {
      if (cancelled || i >= text.length) return;

      const char = document.createTextNode(text.charAt(i));
      target.insertBefore(char, cursor);
      i++;
      window.setTimeout(typeWriter, speed + Math.random() * 50);
    };

    const timer = window.setTimeout(typeWriter, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
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
      ref={containerRef}
      className="hero-section relative w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/hero-studio.mp4"
        poster="/studio-postazione.jpg"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label="Interno dello studio Blitz Tattoo"
        className="hero-video absolute inset-0 h-full w-full object-cover"
      />

      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      <div
        ref={typewriterRef}
        className="hero-typewriter absolute"
        data-text="MODENA, DAL 2015"
      >
        <span className="cursor inline-block" />
      </div>

      <h1 className="hero-word hero-word--primary absolute font-['Bebas_Neue'] uppercase">
        BLITZ
      </h1>

      <p className="hero-copy absolute hidden md:block">
        Tatuaggi custom, cover-up e piercing. Si parte da una conversazione,
        si arriva a un segno costruito per durare.
      </p>

      <h2 className="hero-word hero-word--secondary absolute font-['Bebas_Neue'] uppercase">
        TATTOO
      </h2>

      <a
        href="#booking"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="hero-watermark-cta absolute flex items-center justify-between transition-colors duration-300"
        aria-label="Prenota una consulenza"
      >
        <span>
          <small>Consulenza in studio</small>
          <strong>Prenota ora</strong>
        </span>
        <span className="hero-watermark-cta__arrow" aria-hidden="true">
          &#8599;
        </span>
      </a>

      <div
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ bottom: "3vh", zIndex: 10, animation: "bounce 2s infinite" }}
        aria-hidden="true"
      >
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.5 }}>
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
