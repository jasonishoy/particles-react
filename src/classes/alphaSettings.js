import Proton from "proton-engine";

class Alpha {
  static handleAlpha(index, newValue) {
    this.blobs[index].alpha = newValue;
    this.emitters.length &&
      this.emitters[index].addBehaviour(new Proton.Alpha(newValue, 0));
  }
}

export default Alpha;