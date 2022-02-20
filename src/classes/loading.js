class Loading {
  static handleLoading(newValue) {
    if(this.state.configs.length) {
      let filterData = this.state.configs.filter(
        (config) => config.name === newValue
      );
      let config = filterData[0];
      this.blobs = config.data.blobs;
      this.setState({
        numberOfBlobs: config.data.blobs_number,
      });
      this.emitters = [];
      this.destroyProton();
      this.proton.update();
    }
  }
}

export default Loading;