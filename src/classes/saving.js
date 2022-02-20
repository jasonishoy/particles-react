class Saving {
  static async handleSaving(name, data) {
    let configsNames = this.state.configsNames;
    let configs = this.state.configs;
    if (configsNames.includes(name)) {
      configs.forEach((config) => {
        return config.name === name ?
        config.data = data
        :
        null
      });
      return localStorage.setItem("configs", JSON.stringify(configs));
    }
    // if it's new data
    let newConfig = JSON.stringify([ ...this.state.configs, { name, data }]);
    localStorage.setItem("configs", newConfig);
    configs = JSON.parse(localStorage.getItem("configs"));
    configsNames = configs.map((config) => {
      return config.name;
    });
    this.blobs = configs[0].data.blobs;
    let numberOfBlobs = configs[0].data.blobs_number;
    this.setState({
      configs,
      numberOfBlobs,
      configsNames,
    });
  }
}

export default Saving;
