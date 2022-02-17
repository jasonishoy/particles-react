import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import TweenLite from "gsap/TweenLite";
import Canvas from "./Canvas";
import dot from "../assets/dot";
import LevaModal from "./LevaModal";

/*
1- The number should control the number of "emmiters" not the circles.
  Basically the default should be only one blob spinning the center 
  and then the user can add more blobs (2 or 3 max, for 3, the phase difference should 2Pi/3).
  Bonous: when the user adds more emmiters, the GUI should update to allow the user to control
  the parameters of each blob separately. This is a bit advanced and it has less priority than other changes.
4- How can the user save a configuration of the parameters and load it? It would be great if the GUI had a
  save and load button (or a dropdown mechanism for loading and saving the configs, allowing the user to select
  different configurations). You can perhaps use local storage or maybe let the user save the configs in a JSON
  file and also load a saved JSON file. Try to solve this without using a backend code
5- all the blobs should rotate around the same center.
-----------------------------------------------------------------------------------
2- Now the random drift sliders don't work. I couldn't get the tails of the emmiters to get random by moving     ---> Done
  the sliders.
3- The mass variable doesnt do anything, we can remove it. Just assign a reasonable default value to it and      ---> Done
  remove it from the GUI
6- Also the Alpha and Enable Scale and Scale don't do anything, it seems like the tween is not working properly  ---> Done
  for them
*/
export default class Particles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circlesPositions: [
        {
          divisionNum: 2,
        },
        {
          divisionNum: 1.3,
        },
        {
          divisionNum: 4,
        },
      ],
      shapesRadius: 120,
      speed: 0.01,
      numberOfBlobs: 1,
      shapesMass: 1,
      scale: 2.5,
    };
    this.loaded = false;
    this.center = { x: 0, y: 0 };
    this.conf = { tha: 0 };
    this.attractionBehaviours = [];
    this.renderProton = this.renderProton.bind(this);
    this.emitters = [];
    this.startColor = "#4F1500";
    this.endColor = "#0029FF";
    this.randomDriftCheck = false;
    this.randomDrift = { x: 1, y: 1 };
    this.randomDriftSpeed = 0.03;
    this.alpha = 0.8;
    this.randomDriftBehavior = new Proton.RandomDrift(
      this.randomDrift.x,
      this.randomDrift.y,
      this.randomDriftSpeed
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
        canvas,
        x: canvas.width / 2 + this.state.shapesRadius,
        y: canvas.height / 2,
        startColor: this.startColor,
        endColor: this.endColor,
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

  createImageEmitter({ canvas, x, y, startColor, endColor }) {
    const emitter = new Proton.BehaviourEmitter();
    emitter.rate = new Proton.Rate(
      new Proton.Span(1, 2),
      new Proton.Span(0.01, 0.01)
    );

    emitter.addInitialize(new Proton.Mass(this.state.shapesMass));
    this.lifeBehaviour = new Proton.Life(this.shapesLife);
    emitter.addInitialize(this.lifeBehaviour);
    emitter.addInitialize(new Proton.Body([dot], this.state.shapesBody));
    emitter.addInitialize(new Proton.Radius(this.state.shapesRadius));
    this.randomDriftCheck && emitter.addBehaviour(this.randomDriftBehavior);
    emitter.addBehaviour(new Proton.Alpha(this.alpha, 0));
    this.colorBehaviour = new Proton.Color(startColor, endColor);
    emitter.addBehaviour(this.colorBehaviour);
    emitter.addBehaviour(new Proton.Scale(this.state.scale, 0));
    emitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        "dead"
      )
    );
    const attractionBehaviour = new Proton.Attraction(this.center, 0, 0);
    emitter.addBehaviour(attractionBehaviour);
    this.attractionBehaviours.push(attractionBehaviour);

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
            })
          : this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: -Math.PI / 2,
              divisionNum: 2,
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
            })
          : i % 2
          ? this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (3.3 * Math.PI) / 2,
              divisionNum: 2,
            })
          : this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (-3.3 * Math.PI) / 2,
              divisionNum: 2,
            });
      }
    }
    this.conf.tha += this.state.speed;
  }

  coordinateRotation({ emitter, width, height, tha, divisionNum }) {
    emitter.p.x =
      width / divisionNum +
      this.state.shapesRadius * Math.sin(tha + this.conf.tha);
    emitter.p.y =
      height / 2 + this.state.shapesRadius * Math.cos(tha + this.conf.tha);
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }

  handleMouseDown() {
    this.center.x = this.canvas.width / 2;
    this.center.y = this.canvas.height / 2;

    for (var i = 0; i < this.state.numberOfBlobs; i++)
      this.attractionBehaviours[i].reset(this.center, 120, 200);

    TweenLite.to(this.state, 2, {
      shapesRadius: 10,
      onComplete: () => TweenLite.to(this.state, 1, { shapesRadius: 170 }),
    });
  }

  handleMouseUp() {
    setTimeout(() => {
      for (var i = 0; i < this.state.numberOfBlobs; i++)
        this.attractionBehaviours[i].reset(this.center, 0, 0);
    }, 1000);
  }

  renderProton() {
    this.emitterMove();
    this.proton.update();
    this.proton.stats.update(2);
  }

  handelnumberOfBlobs(newValue) {
    this.setState({
      numberOfBlobs: newValue,
    });
    this.emitters = [];
    this.destroyProton();
    this.proton.update();
  }

  handelSpeed(newValue) {
    TweenLite.to(this.state, 2, {
      speed: newValue,
    });
  }

  handelRadius(newValue) {
    TweenLite.to(this.state, 2, {
      shapesRadius: newValue,
    });
  }

  handelStartColor(newValue) {
    this.startColor = newValue;
    const newColorBehavior = new Proton.Color(this.startColor, this.endColor);
    this.emitters.map((emmiter) => emmiter.addBehaviour(newColorBehavior));
    this.colorBehaviour = newColorBehavior;
  }

  handelEndColor(newValue) {
    this.endColor = newValue;
    const newColorBehavior = new Proton.Color(this.startColor, this.endColor);
    this.emitters.map((emmiter) => emmiter.addBehaviour(newColorBehavior));
    this.colorBehaviour = newColorBehavior;
  }

  handelLife(newValue) {
    const newLifeBehavior = new Proton.Life(newValue);
    for (var i = 0; i < this.emitters.length; i++) {
      this.emitters[i].removeInitialize(this.lifeBehaviour);
      this.emitters[i].addInitialize(newLifeBehavior);
    }
    this.lifeBehaviour = newLifeBehavior;
  }

  handelRandomDriftCheck(randomDriftCheck) {
    this.randomDriftCheck = randomDriftCheck;
    console.log(this.emitters)
    !this.randomDriftCheck &&
      this.emitters.map((emitter) => {
        emitter.removeBehaviour(this.randomDriftBehavior)
      }
      );
    this.randomDriftCheck &&
      this.emitters.map((emitter) =>
        emitter.addBehaviour(this.randomDriftBehavior)
      );
  }

  handelRandomDrift(newValue) {
    this.randomDrift = newValue;
    this.emitters.map((emitter) =>
      emitter.removeBehaviour(this.randomDriftBehavior)
    );
    this.emitters.map((emitter) =>
      emitter.addBehaviour(
        new Proton.RandomDrift(newValue.x, newValue.y, this.randomDriftSpeed)
      )
    );
  }

  handelRandomDriftSpeed(newValue) {
    this.randomDriftSpeed = newValue;
    this.emitters.map((emitter) => 
      emitter.removeBehaviour(this.randomDriftBehavior)
    );
    this.emitters.map((emitter) =>
      emitter.addBehaviour(
        new Proton.RandomDrift(this.randomDrift.x, this.randomDrift.y, newValue)
      )
    );
  }

  handelAlpha(newValue) {
    this.alpha = newValue;
    this.emitters.map((emmiter) => {
      emmiter.addBehaviour(new Proton.Alpha(newValue, 0));
    });
  }

  handelScale(newValue) {
    this.emitters.map((emmiter) => {
      emmiter.addBehaviour(new Proton.Scale(newValue, 0));
    });
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
          numberOfBlobs={this.state.numberOfBlobs}
          handelnumberOfBlobs={this.handelnumberOfBlobs.bind(this)}
          handelSpeed={this.handelSpeed.bind(this)}
          handelRadius={this.handelRadius.bind(this)}
          handelStartColor={this.handelStartColor.bind(this)}
          handelEndColor={this.handelEndColor.bind(this)}
          handelLife={this.handelLife.bind(this)}
          handelRandomDriftCheck={this.handelRandomDriftCheck.bind(this)}
          handelRandomDrift={this.handelRandomDrift.bind(this)}
          handelRandomDriftSpeed={this.handelRandomDriftSpeed.bind(this)}
          handelAlpha={this.handelAlpha.bind(this)}
          handelScale={this.handelScale.bind(this)}
        />
      </>
    );
  }
}
