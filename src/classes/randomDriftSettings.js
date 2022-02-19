import Proton from "proton-engine";

class RandomDrift {
  static handleRandomDrift(index, newValue) {
    const newRandomDriftBehaviour = new Proton.RandomDrift(
      newValue.x,
      newValue.y,
      this.state.blobs[index].randomDriftSpeed
    );
    this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.emitters.length &&
      this.emitters[index].addBehaviour(newRandomDriftBehaviour);
      let blobs = [...this.state.blobs];
      let blob = {...blobs[index]};
      blob.randomDrift = newValue;
      blobs[index] = blob;
      this.setState({blobs});
    this.randomDriftBehavior = newRandomDriftBehaviour;
  }
}

export default RandomDrift;