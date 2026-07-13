import { TextSplitter } from "./TextSplitter";

export class BlindsTextReveal extends TextSplitter {
  private originalColor: string;
  private bgColor: string;

  constructor(textElement: HTMLElement, options: { bgColor?: string } = {}) {
    super(textElement, { splitType: "words" });
    this.bgColor = options.bgColor || "#F5F0EB";
    this.originalColor = window.getComputedStyle(this.textElement).color;
    this.textElement.style.color = "transparent";
    this._buildBlinds();
  }

  private _buildBlinds() {
    const words = this.getWords();
    words.forEach((word) => {
      const wordInners = word.querySelectorAll(".word__inner, .word__red");
      wordInners.forEach((inner) => {
        const topBlind = document.createElement("span");
        topBlind.className = "word__blind word__blind--top";
        topBlind.setAttribute("aria-hidden", "true");

        const bottomBlind = document.createElement("span");
        bottomBlind.className = "word__blind word__blind--bottom";
        bottomBlind.setAttribute("aria-hidden", "true");

        topBlind.style.background = this.bgColor;
        bottomBlind.style.background = this.bgColor;

        const clone = (inner as HTMLElement).cloneNode(true) as HTMLElement;
        topBlind.appendChild(clone);

        const inner2 = (inner as HTMLElement).cloneNode(true) as HTMLElement;
        bottomBlind.appendChild(inner2);

        const redLayer = word.querySelector(".word__red");
        if (redLayer) {
          redLayer.appendChild(topBlind);
          redLayer.appendChild(bottomBlind);
        }
      });
    });
  }

  animate() {
    this.textElement.style.color = this.originalColor;
    this.textElement.classList.add("is-animated");
  }

  destroy() {
    super.destroy();
  }
}
