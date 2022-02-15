import { useControls } from "leva";

/*
  radius, start color, end color - line 37-42 in Particles.jsx // Done
  Mass, Life, Body, Radius, RandomDrifit, Alpha, Color, Scale, Attraction values - line 70-87 in Particles.jsx
*/

const LevaModal = ({
  handelStartColor,
  handelEndColor,
  handelRadius,
  handelMass,
  handelLife,
  handelShapesBody,
  handelRandomDrift,
  handelRandomDriftSpeed,
  handelAlpha,
  handelScale,
  handelAttraction
}) => {
  const control = useControls({
    "Radius": { value: 170, onChange: (v) => handelRadius(v) },
    "Start color": { value: "red", onChange: (v) => handelStartColor(v) },
    "End color": { value: "blue", onChange: (v) => handelEndColor(v) },
    "Mass": {
      value: 1,
      min: 0,
      step: 1,
      onChange: (v) => handelMass(v),
    },
    "Life": {
      value: 8,
      min: 0,
      step: 1,
      onChange: (v) => handelLife(v),
    },
    "Body": {
      value: 32,
      min: 0,
      onChange: (v) => handelShapesBody(v)
    },
    "Random Drift": {
      value: {
        x: 1,
        y: 1,
      },
      step: 0.2,
      onChange: (v) => handelRandomDrift(v)
    },
    "Random Drift Speed": {
      value: 0.03,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: (v) => handelRandomDriftSpeed(v)
    },
    "Alpha": {
      value: {
        x: 0.8,
        y: 0,
      },
      step: 0.1,
      onChange: (v) => handelAlpha(v)
    },
    "Enable Scale": false,
    "Scale" : {
      value: {
        x: 2.5,
        y: 0,
      },
      step: 0.5,
      render: (get) => get('Enable Scale'),
      onChange: (v) => handelScale(v)
    },
    "Attraction": {
      value: {
        x: 0,
        y: 0,
      },
      min: 0,
      step: 0.5,
      onChange: (v) => handelAttraction(v)
    }
  });
  return null;
};

export default LevaModal;
