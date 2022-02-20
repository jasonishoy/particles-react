import Proton from "proton-engine";

class ScaleCheck {
  static handleEnableScale(index, newValue) {
    this.blobs[index].enableScale = newValue;
    this.emitters.length &&
      !this.blobs[index].enableScale &&
        this.emitters[index].addBehaviour(new Proton.Scale(2.5, 0));
  }
}

export default ScaleCheck;