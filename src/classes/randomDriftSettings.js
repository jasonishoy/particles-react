import Proton from "proton-engine";

class RandomDrift {
  static handleRandomDrift(index, newValue) {
    const newRandomDriftBehaviour = new Proton.RandomDrift(
      newValue.x,
      newValue.y,
      this.blobs[index].randomDriftSpeed
    );
    this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.emitters.length &&
      this.emitters[index].addBehaviour(newRandomDriftBehaviour);
    this.blobs[index].randomDrift = newValue;
    this.randomDriftBehavior = newRandomDriftBehaviour;
  }
}

export default RandomDrift;