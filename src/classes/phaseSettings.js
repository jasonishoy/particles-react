import TweenLite from "gsap/TweenLite";

class Phase {
  static handlePhase(index, newValue) {
    TweenLite.to(this.blobs[index], 1, {
      phase: newValue,
    });
  }
}

export default Phase;