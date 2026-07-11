export class TextSplitter {
  textElement: HTMLElement;
  private splitType: string;
  private onResize?: () => void;
  private resizeHandler: (() => void) | null = null;

  constructor(textElement: HTMLElement, options: { splitType?: string; resizeCallback?: () => void } = {}) {
    this.textElement = textElement;
    this.splitType = options.splitType || "words";
    this.onResize = options.resizeCallback;
    this._init();

    if (this.onResize) {
      this.resizeHandler = () => this._init();
      window.addEventListener("resize", this.resizeHandler);
    }
  }

  private _init() {
    this._splitText();
  }

  private _splitText() {
    const text = this.textElement.innerText;
    let items: string[];

    if (this.splitType === "chars") {
      items = text.split("");
    } else {
      items = text.split(/\s+/);
    }

    this.textElement.innerHTML = "";

    items.forEach((item, i) => {
      if (item === "") return;

      if (this.splitType === "chars") {
        if (item === " ") {
          const space = document.createElement("span");
          space.className = "whitespace";
          space.innerHTML = "&nbsp;";
          this.textElement.appendChild(space);
        } else {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = item;
          this.textElement.appendChild(span);
        }
      } else {
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";

        const inner = document.createElement("span");
        inner.className = "word__inner";

        const redLayer = document.createElement("span");
        redLayer.className = "word__red";
        redLayer.textContent = item;

        inner.appendChild(redLayer);
        wordSpan.appendChild(inner);
        this.textElement.appendChild(wordSpan);

        if (i < items.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          space.style.width = "0.35em";
          this.textElement.appendChild(space);
        }
      }
    });
  }

  getWords(): HTMLElement[] {
    return Array.from(this.textElement.querySelectorAll(".word"));
  }

  getChars(): HTMLElement[] {
    return Array.from(this.textElement.querySelectorAll(".char"));
  }

  destroy() {
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  }
}
