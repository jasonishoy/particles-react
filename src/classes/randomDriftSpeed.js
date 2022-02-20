import Proton from "proton-engine";

class RandomDriftSpeed {
  static handleRandomDriftSpeed(index, newValue) {
    const newRandomDriftBehaviour = new Proton.RandomDrift(
      this.blobs[index].randomDrift.x,
      this.blobs[index].randomDrift.y,
      newValue
    );
    this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.emitters.length &&
      this.emitters[index].addBehaviour(newRandomDriftBehaviour);
    this.blobs[index].randomDriftSpeed = newValue;
    this.randomDriftBehavior = newRandomDriftBehaviour;
  }
}

export default RandomDriftSpeed;