import Proton from "proton-engine";

class EndColor {
  static handleEndColor(index, newValue) {
    this.blobs[index].endColor = newValue;
    const newColorBehavior = new Proton.Color(
      this.blobs[index].startColor,
      this.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].removeBehaviour(this.colorBehaviour);
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    this.colorBehaviour = newColorBehavior;
  }
}

export default EndColor;