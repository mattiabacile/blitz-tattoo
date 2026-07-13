export class ScrollBlurFade {
  list: HTMLElement;
  items: NodeListOf<HTMLElement>;
  numItems: number;
  winH: number;
  private scrollInterval: ReturnType<typeof setInterval> | null = null;
  private readonly handleResize: () => void;

  constructor(listElement: HTMLElement) {
    this.list = listElement;
    this.items = this.list.querySelectorAll("li");
    this.numItems = this.items.length;
    this.winH = window.innerHeight;
    this.handleResize = () => {
      this.winH = window.innerHeight;
    };
    this._init();

    window.addEventListener("resize", this.handleResize);
  }

  private _init() {
    this.list.classList.add("is-ready");
    this._start();
  }

  private _start() {
    if (this.scrollInterval) return;
    this.scrollInterval = setInterval(() => this._scrollCallback(), 20);
  }

  private _stop() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }

  toggle(visible: boolean) {
    this[visible ? "_start" : "_stop"]();
  }

  private _getCenter() {
    return this.winH / 2;
  }

  private _scrollCallback() {
    const center = this._getCenter();
    const maxDistance = this.winH / 1.5;

    this.items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const distance = Math.abs(center - elCenter);
      const normalized = Math.min(distance / maxDistance, 1);

      item.style.filter = `blur(${normalized * 8}px)`;
      item.style.opacity = String(1 - normalized);
      item.style.color = normalized < 0.1 ? "#DC2626" : "#FAFAFA";
    });
  }

  init() {
    this._init();
  }

  start() {
    this._start();
  }

  stop() {
    this._stop();
  }

  destroy() {
    this._stop();
    window.removeEventListener("resize", this.handleResize);
  }
}
