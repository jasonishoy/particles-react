import Proton from "proton-engine";

class EndColor {
  static handleEndColor(index, newValue) {
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.endColor = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    const newColorBehavior = new Proton.Color(
      this.state.blobs[index].startColor,
      this.state.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].removeBehaviour(this.colorBehaviour);
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    this.colorBehaviour = newColorBehavior;
    this.emitters = [];
    this.destroyProton();
    this.proton.update();
  }
}

export default EndColor;