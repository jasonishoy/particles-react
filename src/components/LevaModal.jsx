import { useControls } from "leva";

const LevaModal = ({
  numberOfBlobs,
  handelnumberOfBlobs,
  handelSpeed,
  handelRadius,
  handelStartColor,
  handelEndColor,
  handelLife,
  handelRandomDriftCheck,
  handelRandomDrift,
  handelRandomDriftSpeed,
  handelAlpha,
  handelScale,
}) => {
  useControls({
    "Circles Number": { value: 1, min: 1, max: 3, step: 1, onChange: (v) => handelnumberOfBlobs(v) },
    "Speed": { value: 0.01, min: 0.01, max: 0.04, step: 0.001, onChange: (v) => handelSpeed(v)},
    "Radius": { value: 150, min: 10, max: 300, onChange: (v) => handelRadius(v) },
    "Start color": { value: "red", onChange: (v) => handelStartColor(v) },
    "End color": { value: "blue", onChange: (v) => handelEndColor(v) },
    "Life": {
      value: 3,
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
      min: -30,
      max: 30,
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
