// Slider: a small, dependency-free image slider class
class Slider {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".slider-track");
    this.dotsBox = root.querySelector(".slider-dots");
    this.slides = [...this.track.children];
    this.count = this.slides.length;
    this.index = 1;          // starts at 1 because of the clone at position 0
    this.isMoving = false;   // blocks extra clicks while a slide is animating

    this.addClones();
    this.createDots();
    this.bindEvents();
    this.jumpTo(1);
  }

  // Put a copy of the last slide at the start and the first slide at the end
  addClones() {
    const firstClone = this.slides[0].cloneNode(true);
    const lastClone = this.slides[this.count - 1].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");
    this.track.append(firstClone);
    this.track.prepend(lastClone);
  }

  // One dot per real slide
  createDots() {
    this.dots = this.slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => this.goTo(i + 1));
      this.dotsBox.append(dot);
      return dot;
    });
  }

  bindEvents() {
    this.root.querySelector(".slider-btn--prev")
      .addEventListener("click", () => this.goTo(this.index - 1));
    this.root.querySelector(".slider-btn--next")
      .addEventListener("click", () => this.goTo(this.index + 1));
    this.track.addEventListener("transitionend", (e) => this.handleLoop(e));
  }

  // Animated move to a track position
  goTo(i) {
    if (this.isMoving || i === this.index) return;
    this.isMoving = true;
    this.index = i;
    this.move();
  }

  // Once the slide lands on a clone, swap to the matching real slide without animation
  handleLoop(e) {
    if (e.target !== this.track || e.propertyName !== "transform") return;
    if (this.index === 0) this.jumpTo(this.count);
    if (this.index === this.count + 1) this.jumpTo(1);
    this.isMoving = false;
  }

  // Instant move: switch off the transition, move, force a reflow, switch it back on
  jumpTo(i) {
    this.track.classList.add("is-jumping");
    this.index = i;
    this.move();
    void this.track.offsetWidth;
    this.track.classList.remove("is-jumping");
  }

  move() {
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.updateDots();
  }

  // Map the track index (which includes the clones) to a real slide number
  updateDots() {
    const active = (this.index - 1 + this.count) % this.count;
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      dot.setAttribute("aria-current", i === active);
    });
  }
}

// Start every slider on the page
document.querySelectorAll(".slider").forEach((el) => new Slider(el));