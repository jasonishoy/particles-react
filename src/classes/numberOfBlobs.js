class NumberOfBlobs {
  static handlenumberOfBlobs(newValue) {
    this.setState({
      numberOfBlobs: newValue,
    });
    this.emitters = [];
    this.destroyProton();
    this.proton.update();
  }
};

export default NumberOfBlobs;