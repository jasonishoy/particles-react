import TweenLite from "gsap/TweenLite";

class Speed {
  static handleSpeed(index, newValue) {
    TweenLite.to(this.state.blobs[index], 1, {
      speed: newValue / 100.0,
    });
  }
}

export default Speed;