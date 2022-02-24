class NumberOfBlobs {
  static handleNumberOfBlobs(newValue) {
    for (let i = 0; i < 3; i++) {
      this.blobs[i].phase = 0;
    }
    this.setState({
      numberOfBlobs: newValue,
    });
    this.emitters = [];
    this.destroyProton();
    this.proton.update();
  }
};

export default NumberOfBlobs;