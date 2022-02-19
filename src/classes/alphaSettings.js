import Proton from "proton-engine";

class Alpha {
  static handleAlpha(index, newValue) {
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.alpha = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    this.emitters.length &&
      this.emitters[index].addBehaviour(new Proton.Alpha(newValue, 0));
  }
}

export default Alpha;