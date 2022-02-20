import Proton from "proton-engine";

class StartColor {
  static handleStartColor(index, newValue) {
    this.blobs[index].startColor = newValue;
    const newColorBehavior = new Proton.Color(
      this.blobs[index].startColor,
      this.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].removeBehaviour(this.colorBehaviour);
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    this.colorBehaviour = newColorBehavior;
  }
}

export default StartColor;