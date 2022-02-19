import TweenLite from "gsap/TweenLite";

class Speed {
  static handleSpeed(index, newValue) {
    console.log(this.blobs[index]);
    TweenLite.to(this.blobs[index], 1, {
      speed: newValue / 100.0,
    });
  }
}

export default Speed;