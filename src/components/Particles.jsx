import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import TweenLite from "gsap/TweenLite";
import Canvas from "./Canvas";
import dot from "../assets/dot";
import LevaModal from "./LevaModal";

/*
3- The speed of spinning needs a slider (it’s controlled by the increment of tha config (line 153 of your code))


-------------------------------->
1- All numerical inputs should have a slider with reasonable min/max values               ---> Done
3- Random drift needs a checkbox to enable/disable the behavior
4- As I keep changing the variables, the animation gets slower and heavier.               ---> Done                                                            ---> Done
5- Alpha values: the first parameter should be a positive number between zero
  and one and the second parameter is a string and not a number. So the 2D slider
  for alpha is not needed. Just the first param is enough.                                ---> Done
6- The attraction behavior is not needed since it is used for the click animation
   which we don’t need.                         ---> Done
7- The scale variable is also like alpha, the first param is a number and the second
    is a string. So we only need the first param. Also it has to be a positive number.
    Play with the min/max values to make sure the bounds are reasonable.                  ---> Done
8- we don't need the body variable on the GUIB                                            ---> Done
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
      numberOfCircles: 1,      
      shapesMass: 1,
      randomDriftCheck: false,
      randomDrift: 0,
      randomDriftSpeed: 0.01,
      alpha: 0.8,
      scale: 2.5,
    };
    this.loaded = false;
    this.center = { x: 0, y: 0 };
    this.conf = { tha: 0 };
    this.attractionBehaviours = [];
    this.renderProton = this.renderProton.bind(this);
    this.emitters = [];
    this.startColor = "#4F1500";
    this.endColor=  "#0029FF";
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
    for (let i = 0; i < (this.state.numberOfCircles * 2); i+=1) {
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
    this.state.randomDriftCheck && emitter.addBehaviour(
      new Proton.RandomDrift(
        this.state.randomDrift.x,
        this.state.randomDrift.y,
        this.state.randomDriftSpeed
      )
    );

    emitter.addBehaviour(
      new Proton.Alpha(this.state.alpha, 0)
    );
    this.colorBehaviour = new Proton.Color(startColor, endColor);
    emitter.addBehaviour(this.colorBehaviour);
    emitter.addBehaviour(
      new Proton.Scale(this.state.scale, 0)
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
    if (this.state.numberOfCircles === 1) {
      for(let i = 0; i < (this.state.numberOfCircles * 2); i+=1) {
        i%2 ?
        this.coordinateRotation({
          emitter: this.proton.emitters[i],
          width: this.canvas.width,
          height: this.canvas.height,
          tha: Math.PI / 2,
          divisionNum: 2,
        })
        :
        this.coordinateRotation({
          emitter: this.proton.emitters[i],
          width: this.canvas.width,
          height: this.canvas.height,
          tha: -Math.PI / 2,
          divisionNum: 2,
        })
      }
    } else {
      let x  = 0;
      for(let i = 0; i < (this.state.numberOfCircles * 2); i+=1) {
        i%2 ?
          this.coordinateRotation({
            emitter: this.proton.emitters[i],
            width: this.canvas.width,
            height: this.canvas.height,
            tha: Math.PI / 2,
            divisionNum: this.state.circlesPositions[x].divisionNum,
          })
        :
          this.coordinateRotation({
            emitter: this.proton.emitters[i],
            width: this.canvas.width,
            height: this.canvas.height,
            tha: -Math.PI / 2,
            divisionNum: this.state.circlesPositions[x].divisionNum,
          });
        ([1,3,5,7,9].includes(i)) && x++;
      }
    }
    this.conf.tha += this.state.speed;
  }

  coordinateRotation({ emitter, width, height, tha, divisionNum }) {
    emitter.p.x =
      width / divisionNum + this.state.shapesRadius * Math.sin(tha + this.conf.tha);
    emitter.p.y =
      height / 2 + this.state.shapesRadius * Math.cos(tha + this.conf.tha);
  }

  handleResize(width, height) {
    this.renderer.resize(width, height);
  }

  handleMouseDown() {
    this.center.x = this.canvas.width / 2;
    this.center.y = this.canvas.height / 2;

    for (var i = 0; i < this.state.numberOfCircles*2; i++)
      this.attractionBehaviours[i].reset(this.center, 120, 200);

    TweenLite.to(this.state, 2, {
      shapesRadius: 10,
      onComplete: () => TweenLite.to(this.state, 1, { shapesRadius: 170 }),
    });
  }

  handleMouseUp() {
    setTimeout(() => {
      for (var i = 0; i < this.state.numberOfCircles*2; i++)
        this.attractionBehaviours[i].reset(
          this.center,
          0,
          0
        );
    }, 1000);
  }

  renderProton() {
    this.emitterMove();
    this.proton.update();
    this.proton.stats.update(2);
  }

  handelNumberOfCircles(newValue) {
    this.setState({
      numberOfCircles: newValue,
    });
    this.destroyProton();
    this.proton.update();
  }

  handelSpeed(newValue) {
    TweenLite.to(this.state, 2, {
      speed: newValue
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
    for (var i = 0; i < this.emitters.length; i++) {
      this.emitters[i].removeBehaviour(this.colorBehaviour);
      this.emitters[i].addBehaviour(newColorBehavior);
    }
    this.colorBehaviour = newColorBehavior;
  }

  handelEndColor(newValue) {
    this.endColor = newValue;
    const newColorBehavior = new Proton.Color(this.startColor, this.endColor);
    for (var i = 0; i < this.emitters.length; i++) {
      this.emitters[i].removeBehaviour(this.colorBehaviour);
      this.emitters[i].addBehaviour(newColorBehavior);
    }
    this.colorBehaviour = newColorBehavior;
  }

  handelMass(newValue) {
    TweenLite.to(this.state, 2, {
      shapesMass: newValue
    });
  }

  handelLife(newValue) {
    const newLifeBehavior = new Proton.Life(newValue);
    for (var i = 0; i < this.emitters.length; i++) {
      this.emitters[i].removeInitialize(this.lifeBehaviour);
      this.emitters[i].addInitialize(newLifeBehavior);
    }
    this.lifeBehaviour = newLifeBehavior;
  }

  handelRandomDriftCheck(newValue) {
    TweenLite.to(this.state, 2, {
      randomDriftCheck: newValue
    });
  }

  handelRandomDrift(newValue) {
    TweenLite.to(this.state, 2, {
      randomDrift: newValue
    });
  }

  handelRandomDriftSpeed(newValue) {
    TweenLite.to(this.state, 2, {
      randomDriftSpeed: newValue
    });
  }

  handelAlpha(newValue) {
    TweenLite.to(this.state, 2, {
      alpha: newValue
    });
  }

  handelScale(newValue) {
    TweenLite.to(this.state, 2, {
      scale: newValue
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
          handelNumberOfCircles={this.handelNumberOfCircles.bind(this)}
          handelSpeed={this.handelSpeed.bind(this)}
          handelRadius={this.handelRadius.bind(this)}
          handelStartColor={this.handelStartColor.bind(this)}
          handelEndColor={this.handelEndColor.bind(this)}
          handelMass={this.handelMass.bind(this)}
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
