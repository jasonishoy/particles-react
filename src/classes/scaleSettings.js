import Proton from "proton-engine";

class Scale {
  static handleScale(index, newValue) {
    this.blobs[index].scale = newValue;
    this.emitters.length &&
      this.blobs[index].enableScale &&
      this.emitters[index].addBehaviour(new Proton.Scale(newValue, 0));
  }
}

export default Scale;