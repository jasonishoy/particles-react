import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import TweenLite from "gsap/TweenLite";
import Canvas from "./Canvas";
import dot from "../assets/dot";
import LevaModal from "./LevaModal";
/*
7- when the user adds more emmiters, the GUI should update to allow the user to control
  the parameters of each blob separately. This is a bit advanced and it has less priority than other changes.
4- How can the user save a configuration of the parameters and load it?
  It would be great if the GUI had a save and load button (or a dropdown mechanism for loading and saving the configs,
  allowing the user to select different configurations).
  You can perhaps use local storage or maybe let the user save the configs in a JSON file and also load a saved JSON file.
  Try to solve this without using a backend code
-----------------------------------------------------------------------------------
1- The number should control the number of "emmiters" not the circles.
  Basically the default should be only one blob spinning the center 
  and then the user can add more blobs (2 or 3 max, for 3, the phase difference should 2Pi/3).                   ---> Done
2- Now the random drift sliders don't work. I couldn't get the tails of the emmiters to get random by moving     ---> Done
  the sliders.
3- The mass variable doesnt do anything, we can remove it. Just assign a reasonable default value to it and      ---> Done
  remove it from the GUI
5- all the blobs should rotate around the same center.                                                           ---> Done
6- Also the Alpha and Enable Scale and Scale don't do anything, it seems like the tween is not working properly  ---> Done
  for them
*/

export default class Particles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBlobs: 1,
    };
    this.loaded = false;
    this.center = { x: 0, y: 0 };
    this.conf = { thaOne: 0, thaTwo: 0, thaThree: 0,};
    this.renderProton = this.renderProton.bind(this);
    this.emitters = [];
    this.blobs = [
      {
        attractionBehaviour: null,
        speed: 0.01,
        radius: 120,
        startColor: "#4F1500",
        endColor: "#0029FF",
        life: 1,
        randomDriftCheck: false,
        randomDrift: { x: 1, y: 1 },
        randomDriftSpeed: 0.03,
        alpha: 0.8,
        enableScale: false,
        scale: 2.5,
      },
      {
        attractionBehaviour: null,
        speed: 0.01,
        radius: 120,
        startColor: "#4F1500",
        endColor: "#0029FF",
        life: 1,
        randomDriftCheck: false,
        randomDrift: { x: 1, y: 1 },
        randomDriftSpeed: 0.03,
        alpha: 0.8,
        enableScale: false,
        scale: 2.5,
      },
      {
        attractionBehaviour: null,
        speed: 0.01,
        radius: 120,
        startColor: "#4F1500",
        endColor: "#0029FF",
        life: 1,
        randomDriftCheck: false,
        randomDrift: { x: 1, y: 1 },
        randomDriftSpeed: 0.03,
        alpha: 0.8,
        enableScale: false,
        scale: 2.5,
      },
    ];
    this.randomDriftBehavior = new Proton.RandomDrift(
      this.blobs[0].randomDrift.x,
      this.blobs[0].randomDrift.y,
      this.blobs[0].randomDriftSpeed
    );
    this.colorBehaviour = {};
    this.lifeBehaviour = {};
    this.shapesLife = 3;
  }

  handleCanvasInited(canvas) {
    this.createProton(canvas);
    RAFManager.add(this.renderProton);
  }

  destroyProton() {
    RAFManager.remove(this.renderProton);
    this.proton.destroy();
  }

  componentWillUnmount() {
    try {
      this.destroyProton();
    } catch (e) {}
  }

  createProton(canvas) {
    const proton = new Proton();
    for (let i = 0; i < this.state.numberOfBlobs; i += 1) {
      const emitter = this.createImageEmitter({
        index: i,
        canvas,
        x: canvas.width / 2 + this.blobs[i].radius,
        y: canvas.height / 2,
        startColor: this.blobs[i].startColor,
        endColor: this.blobs[i].endColor,
      });
      proton.addEmitter(emitter);
      this.emitters.push(emitter);
    }
    const renderer = new Proton.WebGlRenderer(canvas);
    renderer.blendFunc("SRC_ALPHA", "ONE");
    proton.addRenderer(renderer);
    this.proton = proton;
    this.canvas = canvas;
    this.renderer = renderer;
  }

  createImageEmitter({ index, canvas, x, y, startColor, endColor }) {
    const emitter = new Proton.BehaviourEmitter();
    emitter.rate = new Proton.Rate(
      new Proton.Span(1, 2),
      new Proton.Span(0.01, 0.01)
    );
    emitter.addInitialize(new Proton.Mass(1));
    this.lifeBehaviour = new Proton.Life(this.blobs[index].life);
    emitter.addInitialize(this.lifeBehaviour);
    emitter.addInitialize(new Proton.Body([dot], 32));
    emitter.addInitialize(new Proton.Radius(this.blobs[index].radius));
    this.blobs[index].randomDriftCheck && emitter.addBehaviour(this.randomDriftBehavior);
    emitter.addBehaviour(new Proton.Alpha(this.blobs[index].alpha, 0));
    this.colorBehaviour = new Proton.Color(startColor, endColor);
    emitter.addBehaviour(this.colorBehaviour);
    emitter.addBehaviour(new Proton.Scale(this.blobs[index].scale, 0));
    emitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        "dead"
      )
    );
    const attractionBehaviour = new Proton.Attraction(this.center, 0, 0);
    emitter.addBehaviour(attractionBehaviour);
    this.blobs[index].attractionBehaviour = attractionBehaviour;

    emitter.p.x = x;
    emitter.p.y = y;
    emitter.emit();
    return emitter;
  }

  emitterMove() {
    if (this.state.numberOfBlobs <= 2) {
      for (let i = 0; i < this.state.numberOfBlobs; i += 1) {
        i % 2
          ? this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: Math.PI / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaTwo
            })
          : this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: -Math.PI / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaOne
            });
      }
    } else {
      for (let i = 0; i < this.state.numberOfBlobs; i += 1) {
        i === 2
          ? this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (3.1 * Math.PI) / 3,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaThree
            })
          : i % 2
          ? this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (3.3 * Math.PI) / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaOne
            })
          : this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (-3.3 * Math.PI) / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaTwo
            });
      }
    }
    this.conf.thaOne += this.blobs[0].speed;
    this.conf.thaTwo += this.blobs[1].speed;
    this.conf.thaThree += this.blobs[2].speed;
  }

  coordinateRotation({ emitter, width, height, tha, divisionNum, radius, speed }) {
    emitter.p.x =
      width / divisionNum +
      radius * Math.sin(tha + speed);
    emitter.p.y =
      height / 2 + radius * Math.cos(tha + speed);
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }

  handleMouseDown() {
    this.center.x = this.canvas.width / 2;
    this.center.y = this.canvas.height / 2;
    const radiuses = [];
    for (let i = 0; i < this.state.numberOfBlobs; i+=1) radiuses[i] = this.blobs[i].radius;
    for (let i = 0; i < this.state.numberOfBlobs; i+=1)
      TweenLite.to(this.blobs[i], 2, {
        radius: 10,
        onComplete: () => TweenLite.to(this.blobs[i], 2, { radius: radiuses[i] }),
      });
    setTimeout(() => {
      for (let i = 0; i < this.state.numberOfBlobs; i+=1)
        this.blobs[i].attractionBehaviour.reset(this.center, 120, 200);
    }, 1000);
  }

  handleMouseUp() {
    setTimeout(() => {
      for (var i = 0; i < this.state.numberOfBlobs; i+=1)
        this.blobs[i].attractionBehaviour.reset(this.center, 0, 0);
    }, 1000);
  }

  renderProton() {
    this.emitterMove();
    this.proton.update();
    this.proton.stats.update(2);
  }

  handlenumberOfBlobs(newValue) {
    this.setState({
      numberOfBlobs: newValue,
    });
    this.emitters = [];
    this.destroyProton();
    this.proton.update();
  }

  handleSpeed(index, newValue) {
    TweenLite.to(this.blobs[index], 1, {
      speed: newValue / 100.0
    });
  }

  handleRadius(index, newValue) {
    TweenLite.to(this.blobs[index], 2, {
      radius: newValue,
    });
  }

  handleStartColor(index, newValue) {
    this.blobs[index].startColor = newValue;
    const newColorBehavior = new Proton.Color(
      this.blobs[index].startColor,
      this.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    this.colorBehaviour = newColorBehavior;
  }

  handleEndColor(index, newValue) {
    this.blobs[index].endColor = newValue;
    const newColorBehavior = new Proton.Color(
      this.blobs[index].startColor,
      this.blobs[index].endColor
    );
    this.emitters.length && this.emitters[index].addBehaviour(newColorBehavior);
    this.colorBehaviour = newColorBehavior;
  }

  handleLife(index, newValue) {
    const newLifeBehavior = new Proton.Life(newValue);
    this.blobs[index].life = newValue;
    this.emitters.length && this.emitters[index].removeInitialize(this.lifeBehaviour);
    this.emitters.length && this.emitters[index].addInitialize(newLifeBehavior);
    this.lifeBehaviour = newLifeBehavior;
  }

  handleRandomDriftCheck(index, randomDriftCheck) {
    this.blobs[index].randomDriftCheck = randomDriftCheck;
    !this.blobs[index].randomDriftCheck &&
      this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.blobs[index].randomDriftCheck &&
      this.emitters.length &&
      this.emitters[index].addBehaviour(this.randomDriftBehavior);
  }

  handleRandomDrift(index, newValue) {
    const newRandomDriftBehaviour = new Proton.RandomDrift(
      newValue.x,
      newValue.y,
      this.blobs[index].randomDriftSpeed
    );
    this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.emitters.length && this.emitters[index].addBehaviour(newRandomDriftBehaviour);
    this.blobs[index].randomDrift = newValue;
    this.randomDriftBehavior = newRandomDriftBehaviour;
  }

  handleRandomDriftSpeed(index, newValue) {
    const newRandomDriftBehaviour = new Proton.RandomDrift(
      this.blobs[index].randomDrift.x,
      this.blobs[index].randomDrift.y,
      newValue
    );
    this.emitters.length &&
      this.emitters[index].removeBehaviour(this.randomDriftBehavior);
    this.emitters.length &&
      this.emitters[index].addBehaviour(newRandomDriftBehaviour);
    this.blobs[index].randomDriftSpeed = newValue;
    this.randomDriftBehavior = newRandomDriftBehaviour;
  }

  handleAlpha(index, newValue) {
    this.blobs[index].alpha = newValue;
    this.emitters.length &&
      this.emitters[index].addBehaviour(new Proton.Alpha(newValue, 0));
  }

  handleEnableScale(index, newValue) {
    this.blobs[index].enableScale = newValue;
    this.emitters.length && !this.blobs[index].enableScale &&
      this.emitters[index].addBehaviour(new Proton.Scale(2.5, 0));
  }

  handleScale(index, newValue) {
    this.blobs[index].scale = newValue;
    this.emitters.length && this.blobs[index].enableScale &&
      this.emitters[index].addBehaviour(new Proton.Scale(newValue, 0));
  }

  render() {
    return (
      <>
        <Canvas
          globalCompositeOperation="darker"
          onCanvasInited={this.handleCanvasInited.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onResize={this.handleResize.bind(this)}
        />
        <LevaModal
          handlenumberOfBlobs={this.handlenumberOfBlobs.bind(this)}
          handleSpeed={this.handleSpeed.bind(this)}
          handleRadius={this.handleRadius.bind(this)}
          handleStartColor={this.handleStartColor.bind(this)}
          handleEndColor={this.handleEndColor.bind(this)}
          handleLife={this.handleLife.bind(this)}
          handleRandomDriftCheck={this.handleRandomDriftCheck.bind(this)}
          handleRandomDrift={this.handleRandomDrift.bind(this)}
          handleRandomDriftSpeed={this.handleRandomDriftSpeed.bind(this)}
          handleAlpha={this.handleAlpha.bind(this)}
          handleScale={this.handleScale.bind(this)}
          handleEnableScale={this.handleEnableScale.bind(this)}
        />
      </>
    );
  }
}
