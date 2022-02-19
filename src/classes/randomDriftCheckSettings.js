class RandomDriftCheck {
  static handleRandomDriftCheck(index, randomDriftCheck) {
    let blobs = [...this.state.blobs];
    let blob = {...blobs[index]};
    blob.randomDriftCheck = randomDriftCheck;
    blobs[index] = blob;
    this.setState({blobs});
    !this.state.blobs[index].randomDriftCheck &&
      this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.state.blobs[index].randomDriftCheck &&
      this.emitters.length &&
      this.emitters[index].addBehaviour(this.randomDriftBehavior);
  }
}

export default RandomDriftCheck;