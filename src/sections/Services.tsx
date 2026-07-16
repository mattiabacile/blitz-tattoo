import { useEffect, useRef, useState } from "react";
import { ScrollBlurFade } from "../utils/ScrollBlurFade";

const services = [
  {
    title: "Tatuaggi custom",
    description: "Un progetto originale costruito da zero su anatomia, idea e stile personale.",
    image: "/service-custom.jpg",
    imageAlt: "Un tatuatore confronta un disegno custom con l'anatomia del braccio",
    imagePosition: "50% 46%",
  },
  {
    title: "Cover-up e rework",
    description: "Copriamo o ripensiamo vecchi tatuaggi, partendo da ciò che la pelle permette davvero.",
    image: "/service-cover-up.jpg",
    imageAlt: "Studio di un cover-up su un vecchio tatuaggio del braccio",
    imagePosition: "50% 46%",
  },
  {
    title: "Tradizionale e neo-traditional",
    description: "Linee decise, composizioni leggibili e colore pieno, con radici classiche e voce contemporanea.",
    image: "/service-traditional.jpg",
    imageAlt: "Tatuaggio neo-traditional con pantera e fiore rosso appena completato",
    imagePosition: "50% 48%",
  },
  {
    title: "Blackwork e ornamentale",
    description: "Nero pieno, geometrie e decorazioni che seguono il movimento naturale del corpo.",
    image: "/service-blackwork.jpg",
    imageAlt: "Composizione blackwork ornamentale che segue spalla e schiena",
    imagePosition: "50% 42%",
  },
  {
    title: "Realismo e ritratti",
    description: "Volti, animali e immagini tradotte in pelle con attenzione a luce, volume ed espressione.",
    image: "/service-realism.jpg",
    imageAlt: "Ritratto realistico in black and grey confrontato con la fotografia originale",
    imagePosition: "50% 44%",
  },
  {
    title: "Piercing",
    description: "Foratura sterile, posizionamento ragionato e gioielli adatti alla prima guarigione.",
    image: "/service-piercing.jpg",
    imageAlt: "Controllo del posizionamento prima di un piercing all'orecchio",
    imagePosition: "50% 48%",
  },
  {
    title: "Cambio gioiello e controllo",
    description: "Assistenza post-piercing, verifica della guarigione e scelta del gioiello definitivo.",
    image: "/service-jewelry-change.jpg",
    imageAlt: "Controllo di un piercing guarito e scelta del gioiello definitivo",
    imagePosition: "50% 46%",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const blurFadeRef = useRef<ScrollBlurFade | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const blurFade = new ScrollBlurFade(list, setActiveService);
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
            <div className="services-image__stack">
              {services.map((service, index) => (
                <img
                  key={service.image}
                  src={service.image}
                  alt={index === activeService ? service.imageAlt : ""}
                  aria-hidden={index !== activeService}
                  className={index === activeService ? "is-active" : ""}
                  style={{ objectPosition: service.imagePosition }}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <figcaption>{services[activeService].title}</figcaption>
          </figure>

          <div className="md:col-span-3">
            <ul ref={listRef} className="services-list">
              {services.map((service, index) => (
                <li key={service.title} className={index === activeService ? "is-active" : ""}>
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
