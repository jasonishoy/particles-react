class NumberOfBlobs {
  static handleNumberOfBlobs(newValue) {
    this.setState({
      numberOfBlobs: newValue,
    });
    this.emitters = [];
    this.destroyProton();
    this.proton.update();
  }
};

export default NumberOfBlobs;