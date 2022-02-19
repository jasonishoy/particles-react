import Proton from "proton-engine";

class EndColor {
  static handleEndColor(index, newValue) {
    const newColorBehavior = new Proton.Color(
      this.state.blobs[index].startColor,
      this.state.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.endColor = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    this.colorBehaviour = newColorBehavior;
  }
}

export default EndColor;