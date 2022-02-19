import Proton from "proton-engine";

class StartColor {
  static handleStartColor(index, newValue) {
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.startColor = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    const newColorBehavior = new Proton.Color(
      this.state.blobs[index].startColor,
      this.state.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    this.colorBehaviour = newColorBehavior;
  }
}

export default StartColor;