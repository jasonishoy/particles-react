import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import TweenLite from "gsap/TweenLite";
import Canvas from "./Canvas";
import dot from "../assets/dot";
import LevaModal from "./LevaModal";

// Classes
import NumberOfBlobs from "../classes/numberOfBlobs";
import Speed from "../classes/speedSettings";
import Radius from "../classes/radiusSettings";
import StartColor from "../classes/startColorSettings";
import EndColor from "../classes/endColorSettings";
import Life from "../classes/lifeSettings";
import RandomDriftCheck from "../classes/randomDriftCheckSettings";
import RandomDrift from "../classes/randomDriftSettings";
import RandomDriftSpeed from "../classes/randomDriftSpeed";
import Alpha from "../classes/alphaSettings";
import ScaleCheck from "../classes/scaleCheckSettings";
import Scale from "../classes/scaleSettings";
import Saving from "../classes/saving";
import Loading from "../classes/loading";

export default class Particles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      configs: [],
      configsNames: [],
      numberOfBlobs: 0,
      selectedConfig: {},
    };
    this.blobs = [];
    this.center = { x: 0, y: 0 };
    this.conf = { thaOne: 0, thaTwo: 0, thaThree: 0 };
    this.renderProton = this.renderProton.bind(this);
    this.emitters = [];
    this.currentId = null;
    this.attractionBehaviours = [];
    this.randomDriftBehavior = new Proton.RandomDrift(1, 1, 0.03);
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
    this.blobs[index].enableRandomDrift &&
      emitter.addBehaviour(this.randomDriftBehavior);
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
    this.attractionBehaviours[index] = attractionBehaviour;

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
              speed: this.conf.thaTwo,
            })
          : this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: -Math.PI / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaOne,
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
              speed: this.conf.thaThree,
            })
          : i % 2
          ? this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (3.3 * Math.PI) / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaTwo,
            })
          : this.coordinateRotation({
              emitter: this.proton.emitters[i],
              width: this.canvas.width,
              height: this.canvas.height,
              tha: (-3.3 * Math.PI) / 2,
              divisionNum: 2,
              radius: this.blobs[i].radius,
              speed: this.conf.thaOne,
            });
      }
    }
    this.conf.thaOne += this.blobs.length ? this.blobs[0].speed : 0.001;
    this.conf.thaTwo += this.blobs.length ? this.blobs[1].speed : 0.001;
    this.conf.thaThree += this.blobs.length ? this.blobs[2].speed : 0.001;
  }

  coordinateRotation({
    emitter,
    width,
    height,
    tha,
    divisionNum,
    radius,
    speed,
  }) {
    if (emitter) {
      emitter.p.x = width / divisionNum + radius * Math.sin(tha + speed);
      emitter.p.y = height / 2 + radius * Math.cos(tha + speed);
    }
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }

  handleMouseDown() {
    this.center.x = this.canvas.width / 2;
    this.center.y = this.canvas.height / 2;
    const radiuses = [];
    for (let i = 0; i < this.state.numberOfBlobs; i += 1)
      radiuses[i] = this.blobs[i].radius;
    for (let i = 0; i < this.state.numberOfBlobs; i += 1)
      TweenLite.to(this.blobs[i], 2, {
        radius: 10,
        onComplete: () =>
          TweenLite.to(this.blobs[i], 2, { radius: radiuses[i] }),
      });

    setTimeout(() => {
      for (let i = 0; i < this.state.numberOfBlobs; i += 1)
        this.attractionBehaviours[i].reset(this.center, 120, 200);
    }, 1000);
  }

  handleMouseUp() {
    setTimeout(() => {
      for (var i = 0; i < this.state.numberOfBlobs; i += 1)
        this.attractionBehaviours[i].reset(this.center, 0, 0);
    }, 1000);
  }

  renderProton() {
    this.emitterMove();
    this.proton.update();
    this.proton.stats.update(2);
  }

  componentDidMount() {
    let configs;
    if (localStorage.getItem("configs")) {
      configs = JSON.parse(localStorage.getItem("configs"));
    }
    if (configs && configs.length) {
      const configsNames = configs.map((config) => {
        return config.name;
      });
      this.blobs = configs[0].data.blobs;
      const numberOfBlobs = configs[0].data.blobs_number;
      return this.setState({
        configs,
        numberOfBlobs,
        configsNames,
        selectedConfig: configs[0],
        loaded: true,
      });
    }
    this.blobs = [
      {
        speed: 0.01,
        radius: 120,
        startColor: "#4F1500",
        endColor: "#0029FF",
        life: 1,
        enableRandomDrift: false,
        randomDrift: { x: 1, y: 1 },
        randomDriftSpeed: 0.03,
        alpha: 0.8,
        enableScale: false,
        scale: 2.5,
      },
      {
        speed: 0.01,
        radius: 120,
        startColor: "#4F1500",
        endColor: "#0029FF",
        life: 1,
        enableRandomDrift: false,
        randomDrift: { x: 1, y: 1 },
        randomDriftSpeed: 0.03,
        alpha: 0.8,
        enableScale: false,
        scale: 2.5,
      },
      {
        speed: 0.01,
        radius: 120,
        startColor: "#4F1500",
        endColor: "#0029FF",
        life: 1,
        enableRandomDrift: false,
        randomDrift: { x: 1, y: 1 },
        randomDriftSpeed: 0.03,
        alpha: 0.8,
        enableScale: false,
        scale: 2.5,
      },
    ];
    return this.setState({
      loaded: true,
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
        {this.state.loaded && (
          <LevaModal
            blobs={this.blobs}
            numberofBlobs={this.state.numberOfBlobs}
            configsNames={this.state.configsNames}
            handleNumberOfBlobs={NumberOfBlobs.handleNumberOfBlobs.bind(this)}
            handleSpeed={Speed.handleSpeed.bind(this)}
            handleRadius={Radius.handleRadius.bind(this)}
            handleStartColor={StartColor.handleStartColor.bind(this)}
            handleEndColor={EndColor.handleEndColor.bind(this)}
            handleLife={Life.handleLife.bind(this)}
            handleRandomDriftCheck={RandomDriftCheck.handleRandomDriftCheck.bind(
              this
            )}
            handleRandomDrift={RandomDrift.handleRandomDrift.bind(this)}
            handleRandomDriftSpeed={RandomDriftSpeed.handleRandomDriftSpeed.bind(
              this
            )}
            handleAlpha={Alpha.handleAlpha.bind(this)}
            handleScale={Scale.handleScale.bind(this)}
            handleEnableScale={ScaleCheck.handleEnableScale.bind(this)}
            handleSaving={Saving.handleSaving.bind(this)}
            handleLoading={Loading.handleLoading.bind(this)}
            handleDelete={Saving.handleDelete.bind(this)}
          />
        )}
      </>
    );
  }
}
