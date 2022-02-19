import Proton from "proton-engine";

class ScaleCheck {
  static handleEnableScale(index, newValue) {
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.enableScale = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    this.emitters.length &&
      !this.state.blobs[index].enableScale &&
        this.emitters[index].addBehaviour(new Proton.Scale(2.5, 0));
  }
}

export default ScaleCheck;