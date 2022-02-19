class RandomDriftCheck {
  static handleRandomDriftCheck(index, randomDriftCheck) {
    this.blobs[index].randomDriftCheck = randomDriftCheck;
    !this.blobs[index].randomDriftCheck &&
      this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.blobs[index].randomDriftCheck &&
      this.emitters.length &&
      this.emitters[index].addBehaviour(this.randomDriftBehavior);
  }
}

export default RandomDriftCheck;