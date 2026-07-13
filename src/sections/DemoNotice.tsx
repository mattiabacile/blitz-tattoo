import { useState } from "react";

export default function DemoNotice() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="demo-modal" role="dialog" aria-modal="false" aria-labelledby="demo-modal-title">
          <div className="demo-modal__backdrop" aria-hidden="true" />
          <div className="demo-modal__panel">
            <p className="demo-notice__label">Demo portfolio</p>
            <h2 id="demo-modal-title" className="demo-modal__title">
              Demo creata da Mattia Bacile
            </h2>
            <p>
              Questo sito non rappresenta un vero studio tattoo. Serve a mostrare
              stili, pagine e integrazioni che possono essere adattati a un
              progetto reale.
            </p>
            <p>
              Creato da <strong>Mattia Bacile</strong>. Tutto è personalizzabile:
              testi, immagini, colori, funzioni e prenotazioni.
            </p>
            <button type="button" className="demo-modal__button" onClick={() => setIsOpen(false)}>
              Ho capito
            </button>
          </div>
        </div>
      )}

      <aside className="demo-sticky" aria-label="Avviso demo portfolio">
        <div>
          <strong>Demo portfolio</strong>
          <span>
            Sito dimostrativo creato da <b>Mattia Bacile</b>. Testi, immagini,
            colori, funzioni e prenotazioni sono personalizzabili.
          </span>
        </div>
        {!isOpen && (
          <button type="button" onClick={() => setIsOpen(true)}>
            Dettagli
          </button>
        )}
      </aside>
    </>
  );
}
