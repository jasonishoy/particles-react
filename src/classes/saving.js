import { v4 as uuidv4 } from "uuid";

class Saving {
  static async handleSaving(name, data) {
    if (this.state.configsNames.includes(name)) {
      return await fetch(`http://localhost:8000/shapes/${this.currentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, data }),
      })
        .then((res) => res.json())
        .then((config) => {
          this.setState((prevState) => ({
            configsNames: [config.name, ...prevState.configsNames],
            numberOfBlobs: config.data.blobs_number
          }));
          this.blobs = config.data.blobs;
          this.currentId = config.id;
          this.emitters = [];
          this.destroyProton();
          this.proton.update();
          alert("Config updated successfully");
        })
        .catch((err) => alert("Something went wrong!"));
    }

    await fetch("http://localhost:8000/shapes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: uuidv4(), name, data }),
    })
      .then((res) => res.json())
      .then((config) => {
        this.setState((prevState) => ({
          configs: [config, ...prevState.configs],
          configsNames: [config.name, ...prevState.configsNames],
          numberOfBlobs: config.data.blobs_number
        }));
        this.blobs = config.data.blobs;
        this.currentId = config.id;
        this.emitters = [];
        this.destroyProton();
        this.proton.update();
        alert("Config saved successfully");
      })
      .catch((err) => alert("Something went wrong!"));
  }
}

export default Saving;