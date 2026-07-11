import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "./TextSplitter";

gsap.registerPlugin(ScrollTrigger);

export function initFallingText(selector: string, stagger: number = 0.03) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const textElement = el as HTMLElement;
    const splitter = new TextSplitter(textElement, { splitType: "chars" });
    const chars = splitter.getChars();

    gsap.fromTo(
      chars,
      { yPercent: -120 },
      {
        yPercent: 0,
        ease: "back.out(1.2)",
        stagger,
        duration: 0.6,
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}
