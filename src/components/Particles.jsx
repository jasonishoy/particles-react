import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import TweenLite from "gsap/TweenLite";
import Canvas from "./Canvas";
import dot from "../assets/dot";
import LevaModal from "./LevaModal";

// width, height, radius, start colder, end color - line 37-42 in Particles.jsx
// Mass, Life, Body, Radius, RandomDrifit, Alpha, Color, Scale, Attraction values - line 70-87 in Particles.jsx
export default class Particles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasRef: null,
      radius: 170, startColor: "#4F1500", endColor: "#0029FF"
    };
    this.loaded = false;
    this.center = { x: 0, y: 0 };
    this.conf = { radius: this.state.radius, tha: 100 };
    this.attractionBehaviours = [];
    this.renderProton = this.renderProton.bind(this);
  }

  handleCanvasInited(canvas) {
    this.createProton(canvas);
    this.setState({canvasRef: canvas})
    RAFManager.add(this.renderProton);
  }

  componentWillUnmount() {
    try {
      RAFManager.remove(this.renderProton);
      const emitter1 = this.proton.emitters[0];
      const emitter2 = this.proton.emitters[1];
      emitter1.destroy();
      emitter2.destroy();
      this.proton.destroy();
    } catch (e) {}
  }

  createProton(canvas) {
    const proton = new Proton();
    const emitter1 = this.createImageEmitter({
      canvas,
      x: canvas.width / 2 + this.conf.radius,
      y: canvas.height / 2,
      startColor: this.state.startColor,
      endColor: this.state.endColor
    });
    const emitter2 = this.createImageEmitter({
      canvas,
      x: canvas.width / 2 - this.conf.radius,
      y: canvas.height / 2,
      startColor: this.state.startColor,
      endColor: this.state.endColor
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

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(8));
    emitter.addInitialize(new Proton.Body([dot], 32));
    emitter.addInitialize(new Proton.Radius(40));
    emitter.addBehaviour(new Proton.RandomDrift(1, 1, 4));

    emitter.addBehaviour(new Proton.Alpha(0.8, 0));
    emitter.addBehaviour(new Proton.Color(startColor, endColor));
    emitter.addBehaviour(new Proton.Scale(2.5, 0));
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
      tha: Math.PI / 2
    });

    this.coordinateRotation({
      emitter: emitter2,
      width: this.canvas.width,
      height: this.canvas.height,
      tha: -Math.PI / 2
    });

    this.conf.tha += 0.01;
  }

  coordinateRotation({ emitter, width, height, tha }) {
    emitter.p.x = width / 2 + this.conf.radius * Math.sin(tha + this.conf.tha);
    emitter.p.y = height / 2 + this.conf.radius * Math.cos(tha + this.conf.tha);
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }

  handleMouseDown() {
    this.center.x = this.canvas.width / 2;
    this.center.y = this.canvas.height / 2;

    for (var i = 0; i < 2; i++)
      this.attractionBehaviours[i].reset(this.center, 120, 200);

    TweenLite.to(this.conf, 2, {
      radius: 10,
      onComplete: () => TweenLite.to(this.conf, 1, { radius: 190 })
    });
  }

  handleMouseUp() {
    setTimeout(() => {
      for (var i = 0; i < 2; i++)
        this.attractionBehaviours[i].reset(this.center, 0, 0);
    }, 1000);
  }

  renderProton() {
    this.emitterMove();
    this.proton.update();
    this.proton.stats.update(2);
  }

  handelChanges(value) {
    this.setState(value);
    if (this.state.canvasRef) {
      this.createProton(this.state.canvasRef)
    };
    console.log(this.state.radius);
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
          handelChanges={this.handelChanges.bind(this)}
        />
      </>
    );
  }
}
