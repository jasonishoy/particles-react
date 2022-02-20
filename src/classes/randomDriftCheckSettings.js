class RandomDriftCheck {
  static handleRandomDriftCheck(index, enableRandomDrift) {
    this.blobs[index].enableRandomDrift = enableRandomDrift;
    !this.blobs[index].enableRandomDrift &&
      this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.blobs[index].enableRandomDrift &&
      this.emitters.length &&
      this.emitters[index].addBehaviour(this.randomDriftBehavior);
  }
}

export default RandomDriftCheck;