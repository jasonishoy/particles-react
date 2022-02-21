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
  static handleDelete() {
    let configs = this.state.configs;
    let removeConfigName = this.state.selectedConfig.name;
    if (removeConfigName) {
      const newConfigs = configs.filter((conf) => conf.name !== this.state.selectedConfig.name);
      localStorage.setItem("configs", JSON.stringify(newConfigs));
      configs = JSON.parse(localStorage.getItem("configs"));
      let configsNames = configs.map((config) => {
        return config.name;
      });
      if (configs && configs.length) {
        this.blobs = configs[0].data.blobs;
        let numberOfBlobs = configs[0].data.blobs_number;
        this.setState({
          configs,
          numberOfBlobs,
          configsNames,
          selectedConfig: {}
        });
      }
      alert('The config "' + removeConfigName + '" is removed successfully.');
      window.location.reload(false);
    } else {
      alert('Please select a config to remove');
    }
  }
}

export default Saving;
