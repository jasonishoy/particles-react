import Proton from "proton-engine";

class Scale {
  static handleScale(index, newValue) {
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.scale = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    this.emitters.length &&
      this.state.blobs[index].enableScale &&
      this.emitters[index].addBehaviour(new Proton.Scale(newValue, 0));
  }
}

export default Scale;