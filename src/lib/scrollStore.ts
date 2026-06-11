"use client";

class ScrollStore {
  public y = 0;
  public height = 600;
  public progress = 0;
  private targetY = 0;
  private targetProgress = 0;

  constructor() {
    if (typeof window !== "undefined") {
      // Initialize values
      this.y = window.scrollY;
      this.targetY = this.y;
      this.height = window.innerHeight || 1;
      this.progress = this.y / this.height;
      this.targetProgress = this.progress;

      // Event listener for scroll
      const handleScroll = () => {
        this.targetY = window.scrollY;
        this.targetProgress = this.targetY / this.height;
      };

      // Event listener for resize
      const handleResize = () => {
        this.height = window.innerHeight || 1;
        this.targetProgress = this.targetY / this.height;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });

      // Frame tick loop to smoothly lerp progress and y coordinates
      const tick = () => {
        const lerpFactor = 0.08; // Butter-smooth easing factor
        
        const yDiff = this.targetY - this.y;
        if (Math.abs(yDiff) > 0.1) {
          this.y += yDiff * lerpFactor;
        } else {
          this.y = this.targetY;
        }

        const progressDiff = this.targetProgress - this.progress;
        if (Math.abs(progressDiff) > 0.0001) {
          this.progress += progressDiff * lerpFactor;
        } else {
          this.progress = this.targetProgress;
        }

        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }
}

export const scrollStore = new ScrollStore();
export default scrollStore;
