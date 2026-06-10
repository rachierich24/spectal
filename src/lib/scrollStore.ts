"use client";

class ScrollStore {
  public y = 0;
  public height = 600;
  public progress = 0;

  constructor() {
    if (typeof window !== "undefined") {
      // Initialize values
      this.y = window.scrollY;
      this.height = window.innerHeight || 1;
      this.progress = this.y / this.height;

      // Event listener for scroll
      const handleScroll = () => {
        this.y = window.scrollY;
        this.progress = this.y / this.height;
      };

      // Event listener for resize
      const handleResize = () => {
        this.height = window.innerHeight || 1;
        this.progress = this.y / this.height;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
    }
  }
}

export const scrollStore = new ScrollStore();
export default scrollStore;
