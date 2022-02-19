import Proton from "proton-engine";

class Life {
  static handleLife(index, newValue) {
    const newLifeBehavior = new Proton.Life(newValue);
    this.blobs[index].life = newValue;
    this.emitters.length &&
      this.emitters[index].removeInitialize(this.lifeBehaviour);
    this.emitters.length && this.emitters[index].addInitialize(newLifeBehavior);
    this.lifeBehaviour = newLifeBehavior;
  }
}

export default Life;
