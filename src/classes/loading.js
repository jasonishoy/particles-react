class Loading {
  static handleLoading(newValue) {
    if(this.state.configs.length) {
      let filterData = this.state.configs.filter(
        (config) => config.name === newValue
      );
      let blob = filterData[0];
      this.currentId = blob.id;
      this.setState({
        numberOfBlobs: blob.data.blobs_number,
      });
      this.blobs = blob.data.blobs;
      this.emitters = [];
      this.destroyProton();
      this.proton.update();
    }
  }
}

export default Loading;