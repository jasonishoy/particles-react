import TweenLite from "gsap/TweenLite";

class Radius {
  static handleRadius(index, newValue) {
    TweenLite.to(this.state.blobs[index], 1, {
      radius: newValue,
    });
  }
}

export default Radius;