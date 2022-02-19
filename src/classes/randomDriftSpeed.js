import Proton from "proton-engine";

class RandomDriftSpeed {
  static handleRandomDriftSpeed(index, newValue) {
    const newRandomDriftBehaviour = new Proton.RandomDrift(
      this.state.blobs[index].randomDrift.x,
      this.state.blobs[index].randomDrift.y,
      newValue
    );
    this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.emitters.length &&
      this.emitters[index].addBehaviour(newRandomDriftBehaviour);
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.randomDriftSpeed = newValue;
    blobs[index] = blob;
    this.setState({blobs});
    this.randomDriftBehavior = newRandomDriftBehaviour;
  }
}

export default RandomDriftSpeed;