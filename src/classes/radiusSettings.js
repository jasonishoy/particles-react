import TweenLite from "gsap/TweenLite";

class Radius {
  static handleRadius(index, newValue) {
    console.log(this.blobs[index]);
    TweenLite.to(this.blobs[index], 1, {
      radius: newValue,
    });
  }
}

export default Radius;