import { useControls } from "leva";

const LevaModal = ({
  handelNumberOfCircles,
  handelSpeed,
  handelRadius,
  handelStartColor,
  handelEndColor,
  handelMass,
  handelLife,
  handelRandomDriftCheck,
  handelRandomDrift,
  handelRandomDriftSpeed,
  handelAlpha,
  handelScale,
}) => {
  const control = useControls({
    "Circles Number": { value: 1, min: 1, max: 3, step: 1, onChange: (v) => handelNumberOfCircles(v) },
    "Speed": { value: 1000, min: 1000, max: 10000, step: 500, onChange: (v) => handelSpeed(v)},
    "Radius": { value: 120, min: 10, max: 120, onChange: (v) => handelRadius(v) },
    "Start color": { value: "red", onChange: (v) => handelStartColor(v) },
    "End color": { value: "blue", onChange: (v) => handelEndColor(v) },
    "Mass": {
      value: 1,
      min: 1,
      max: 12,
      step: 1,
      onChange: (v) => handelMass(v),
    },
    "Life": {
      value: 8,
      min: 1,
      max: 12,
      step: 1,
      onChange: (v) => handelLife(v),
    },
    "Enable Random Drift": {
      value: false,
      onChange: (v) => handelRandomDriftCheck(v)
    },
    "Random Drift": {
      value: {
        x: 1,
        y: 1,
      },
      render: (get) => get('Enable Random Drift'),
      onChange: (v) => handelRandomDrift(v)
    },
    "Random Drift Speed": {
      value: 0.03,
      min: 0.01,
      max: 1,
      step: 0.01,
      render: (get) => get('Enable Random Drift'),
      onChange: (v) => handelRandomDriftSpeed(v)
    },
    "Alpha": {
      value: 0.8,
      min: 0.1,
      max: 1,
      step: 0.1,
      onChange: (v) => handelAlpha(v)
    },
    "Enable Scale": false,
    "Scale": {
      value: 2.5,
      min: 1,
      max: 4,
      step: 0.5,
      render: (get) => get('Enable Scale'),
      onChange: (v) => handelScale(v)
    },
  });
  return null;
};

export default LevaModal;
