import TweenLite from "gsap/TweenLite";
class Phase {
  static handleTha(index, newValue) {
    TweenLite.to(this.blobs[index], 1, {
      tha: newValue,
    });
  }
}

export default Phase;