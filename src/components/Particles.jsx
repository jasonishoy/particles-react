import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import TweenLite from "gsap/TweenLite";
import Canvas from "./Canvas";
import dot from "../assets/dot";
import LevaModal from "./LevaModal";

export default class Particles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startColor: "#ffffff",
      endColor: "#000000",
      shapesRadius: 140,
      shapesMass: 1,
      shapesLife: 8,
      shapesBody: 32,
      randomDrift: {
        x: 1,
        y: 1,
      },
      randomDriftSpeed: 0.01,
      alpha: {
        x: 0.8,
        y: 0,
      },
      scale: {
        x: 2.5,
        y: 0,
      },
      attraction: {
        x: 0,
        y: 0,
      },
    };
    this.loaded = false;
    this.center = { x: 0, y: 0 };
    this.conf = { tha: 0 };
    this.attractionBehaviours = [];
    this.renderProton = this.renderProton.bind(this);
  }

  handleCanvasInited(canvas) {
    this.createProton(canvas);
    RAFManager.add(this.renderProton);
  }

  destroyProton() {
    RAFManager.remove(this.renderProton);
    const emitter1 = this.proton.emitters[0];
    const emitter2 = this.proton.emitters[1];
    emitter1.destroy();
    emitter2.destroy();
    this.proton.destroy();
  }

  componentWillUnmount() {
    try {
      this.destroyProton();
    } catch (e) {}
  }

  createProton(canvas) {
    const proton = new Proton();
    const emitter1 = this.createImageEmitter({
      canvas,
      x: canvas.width / 2 + this.state.shapesRadius,
      y: canvas.height / 2,
      startColor: this.state.startColor,
      endColor: this.state.endColor,
    });
    const emitter2 = this.createImageEmitter({
      canvas,
      x: canvas.width / 2 - this.state.shapesRadius,
      y: canvas.height / 2,
      startColor: this.state.startColor,
      endColor: this.state.endColor,
    });
    proton.addEmitter(emitter1);
    proton.addEmitter(emitter2);

    const renderer = new Proton.WebGlRenderer(canvas);
    renderer.blendFunc("SRC_ALPHA", "ONE");
    proton.addRenderer(renderer);

    this.proton = proton;
    this.canvas = canvas;
    this.renderer = renderer;
  }

  createImageEmitter({ canvas, x, y, startColor, endColor }) {
    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(
      new Proton.Span(1, 2),
      new Proton.Span(0.01, 0.02)
    );

    emitter.addInitialize(new Proton.Mass(this.state.shapesMass));
    emitter.addInitialize(new Proton.Life(this.state.shapesLife));
    emitter.addInitialize(new Proton.Body([dot], this.state.shapesBody));
    emitter.addInitialize(new Proton.Radius(this.state.shapesRadius));
    emitter.addBehaviour(
      new Proton.RandomDrift(
        this.state.randomDrift.x,
        this.state.randomDrift.y,
        this.state.randomDriftSpeed
      )
    );

    emitter.addBehaviour(
      new Proton.Alpha(this.state.alpha.x, this.state.alpha.y)
    );
    emitter.addBehaviour(new Proton.Color(startColor, endColor));
    emitter.addBehaviour(
      new Proton.Scale(this.state.scale.x, this.state.scale.y)
    );
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
    const emitter1 = this.proton.emitters[0];
    const emitter2 = this.proton.emitters[1];

    this.coordinateRotation({
      emitter: emitter1,
      width: this.canvas.width,
      height: this.canvas.height,
      tha: Math.PI / 2,
    });

    this.coordinateRotation({
      emitter: emitter2,
      width: this.canvas.width,
      height: this.canvas.height,
      tha: -Math.PI / 2,
    });

    this.conf.tha += 0.01;
  }

  coordinateRotation({ emitter, width, height, tha }) {
    emitter.p.x =
      width / 2 + this.state.shapesRadius * Math.sin(tha + this.conf.tha);
    emitter.p.y =
      height / 2 + this.state.shapesRadius * Math.cos(tha + this.conf.tha);
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }

  handleMouseDown() {
    this.center.x = this.canvas.width / 2;
    this.center.y = this.canvas.height / 2;

    for (var i = 0; i < 2; i++)
      this.attractionBehaviours[i].reset(this.center, 120, 200);

    TweenLite.to(this.state, 2, {
      shapesRadius: 10,
      onComplete: () => TweenLite.to(this.state, 1, { shapesRadius: 170 }),
    });
  }

  handleMouseUp() {
    setTimeout(() => {
      for (var i = 0; i < 2; i++)
        this.attractionBehaviours[i].reset(
          this.center,
          this.state.attraction.x,
          this.state.attraction.y
        );
    }, 1000);
  }

  renderProton() {
    this.emitterMove();
    this.proton.update();
    this.proton.stats.update(2);
  }

  handelRadius(newValue) {
    this.setState({
      shapesRadius: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelStartColor(newValue) {
    this.setState({
      startColor: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelEndColor(newValue) {
    this.setState({
      endColor: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelMass(newValue) {
    this.setState({
      shapesMass: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelLife(newValue) {
    this.setState({
      shapesLife: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelShapesBody(newValue) {
    this.setState({
      shapesBody: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelRandomDrift(newValue) {
    this.setState({
      randomDrift: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelRandomDriftSpeed(newValue) {
    this.setState({
      randomDriftSpeed: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelAlpha(newValue) {
    this.setState({
      alpha: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelScale(newValue) {
    this.setState({
      scale: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
  }

  handelAttraction(newValue) {
    this.setState({
      attraction: newValue,
    });
    this.destroyProton();
    this.createProton(this.canvas);
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
          handelRadius={this.handelRadius.bind(this)}
          handelStartColor={this.handelStartColor.bind(this)}
          handelEndColor={this.handelEndColor.bind(this)}
          handelMass={this.handelMass.bind(this)}
          handelLife={this.handelLife.bind(this)}
          handelShapesBody={this.handelShapesBody.bind(this)}
          handelRandomDrift={this.handelRandomDrift.bind(this)}
          handelRandomDriftSpeed={this.handelRandomDriftSpeed.bind(this)}
          handelAlpha={this.handelAlpha.bind(this)}
          handelScale={this.handelScale.bind(this)}
          handelAttraction={this.handelAttraction.bind(this)}
        />
      </>
    );
  }
}
