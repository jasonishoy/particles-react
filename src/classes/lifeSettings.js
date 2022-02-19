import Proton from "proton-engine";

class Life {
  static handleLife(index, newValue) {
    const newLifeBehavior = new Proton.Life(newValue);
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.life = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    this.emitters.length &&
      this.emitters[index].removeInitialize(this.lifeBehaviour);
    this.emitters.length && this.emitters[index].addInitialize(newLifeBehavior);
    this.lifeBehaviour = newLifeBehavior;
  }
}

export default Life;
