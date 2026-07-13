import { useEffect, useRef } from "react";
import { ScrollBlurFade } from "../utils/ScrollBlurFade";

const services = [
  {
    title: "Tatuaggi custom",
    description: "Un progetto originale costruito da zero su anatomia, idea e stile personale.",
  },
  {
    title: "Cover-up e rework",
    description: "Copriamo o ripensiamo vecchi tatuaggi, partendo da ciò che la pelle permette davvero.",
  },
  {
    title: "Tradizionale e neo-traditional",
    description: "Linee decise, composizioni leggibili e colore pieno, con radici classiche e voce contemporanea.",
  },
  {
    title: "Fine line e minimal",
    description: "Segni sottili e proporzioni precise, progettati per restare puliti anche nel tempo.",
  },
  {
    title: "Blackwork e ornamentale",
    description: "Nero pieno, geometrie e decorazioni che seguono il movimento naturale del corpo.",
  },
  {
    title: "Realismo e ritratti",
    description: "Volti, animali e immagini tradotte in pelle con attenzione a luce, volume ed espressione.",
  },
  {
    title: "Piercing",
    description: "Foratura sterile, posizionamento ragionato e gioielli adatti alla prima guarigione.",
  },
  {
    title: "Cambio gioiello e controllo",
    description: "Assistenza post-piercing, verifica della guarigione e scelta del gioiello definitivo.",
  },
];

export default function Services() {
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const blurFadeRef = useRef<ScrollBlurFade | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const blurFade = new ScrollBlurFade(list);
    blurFadeRef.current = blurFade;

    const section = sectionRef.current;
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            blurFade.toggle(entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(section);
      return () => {
        observer.disconnect();
        blurFade.destroy();
      };
    }

    return () => blurFade.destroy();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-section relative">
      <div className="services-inner mx-auto">
        <header className="services-header grid grid-cols-1 md:grid-cols-5">
          <h2 className="font-['Bebas_Neue'] uppercase md:col-span-3">
            TATUAGGI E PIERCING,
            <br />
            <span>FATTI COME SI DEVE.</span>
          </h2>
          <p className="md:col-span-2">
            Dal primo schizzo alla guarigione, ogni passaggio viene spiegato e
            seguito. Scegliamo tecnica, artista e tempi in base al progetto,
            non in base alla fretta.
          </p>
        </header>

        <div className="services-content grid grid-cols-1 md:grid-cols-5">
          <figure className="services-image md:col-span-2">
            <img
              src="/studio-postazione.jpg"
              alt="Una postazione di lavoro all'interno di Blitz Tattoo"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Una postazione, preparata per il prossimo progetto.</figcaption>
          </figure>

          <div className="md:col-span-3">
            <ul ref={listRef} className="services-list">
              {services.map((service) => (
                <li key={service.title}>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="services-cta inline-flex items-center gap-4 transition-colors duration-300"
            >
              Parliamone in studio <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
