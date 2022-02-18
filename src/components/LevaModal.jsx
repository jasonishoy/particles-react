import { useControls, folder } from "leva";

const LevaModal = ({
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
    numberOfBlobs: {
      label: "Number of blobs",
      value: 1,
      min: 1,
      max: 3,
      step: 1,
      onChange: (value) => handelnumberOfBlobs(value),
    },
    First: folder(
      {
        speed1: {
          label: "Speed",
          value: 0.01,
          min: 0.01,
          max: 0.04,
          step: 0.001,
          onChange: (value) => handelSpeed(0, value),
        },
        radius1: {
          label: "Radius",
          value: 150,
          min: 10,
          max: 300,
          onChange: (value) => handelRadius(0, value),
        },
        startColor1: {
          label: "Start color",
          value: "#4F1500",
          onChange: (value) => handelStartColor(0, value),
        },
        endColor1: {
          label: "End color",
          value: "#0029FF",
          onChange: (value) => handelEndColor(0, value),
        },
        life1: {
          label: "Life",
          value: 3,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handelLife(0, value),
        },
        enableRandomDrift1: {
          label: "Enable Random Drift",
          value: false,
          onChange: (value) => handelRandomDriftCheck(0, value),
        },
        randomDrift1: {
          label: "Random Drift",
          value: {
            x: 1,
            y: 1,
          },
          min: -30,
          max: 30,
          render: (get) => get("First.enableRandomDrift1"),
          onChange: (value) => handelRandomDrift(0, value),
        },
        randomDriftSpeed1: {
          label: "Random Drift Speed",
          value: 0.03,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("First.enableRandomDrift1"),
          onChange: (value) => handelRandomDriftSpeed(0, value),
        },
        alpha1: {
          label: "Alpha",
          value: 0.8,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handelAlpha(0, value),
        },
        enableScale1: {
          label: "Enable Scale",
          value: true,
        },
        scale1: {
          label: "Scale",
          value: 2.5,
          min: 1,
          max: 4,
          step: 0.5,
          render: (get) => get("First.enableScale1"),
          onChange: (value) => handelScale(0, value),
        },
      }
    ),
    Second: folder(
      {
        speed2: {
          label: "Speed",
          value: 0.01,
          min: 0.01,
          max: 0.04,
          step: 0.001,
          onChange: (value) => handelSpeed(1, value),
        },
        radius2: {
          label: "Radius",
          value: 150,
          min: 10,
          max: 300,
          onChange: (value) => handelRadius(1, value),
        },
        startColor2: {
          label: "Start color",
          value: "#4F1500",
          onChange: (value) => handelStartColor(1, value),
        },
        endColor2: {
          label: "End color",
          value: "#0029FF",
          onChange: (value) => handelEndColor(1, value),
        },
        life2: {
          label: "Life",
          value: 3,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handelLife(1, value),
        },
        enableRandomDrift2: {
          label: "Enable Random Drift",
          value: false,
          onChange: (value) => handelRandomDriftCheck(1, value),
        },
        randomDrift2: {
          label: "Random Drift",
          value: {
            x: 1,
            y: 1,
          },
          min: -30,
          max: 30,
          render: (get) => get("Second.enableRandomDrift2"),
          onChange: (value) => handelRandomDrift(1, value),
        },
        randomDriftSpeed2: {
          label: "Random Drift Speed",
          value: 0.03,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("Second.enableRandomDrift2"),
          onChange: (value) => handelRandomDriftSpeed(1, value),
        },
        alpha2: {
          label: "Alpha",
          value: 0.8,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handelAlpha(1, value),
        },
        enableScale2: {
          label: "Enable Scale",
          value: false,
        },
        scale2: {
          label: "Scale",
          value: 2.5,
          min: 1,
          max: 4,
          step: 0.5,
          render: (get) => get("enableScale2"),
          onChange: (value) => handelScale(1, value),
        },
      },
      {
        render: (get) => get("numberOfBlobs") >= 2,
      }
    ),
    Third: folder(
      {
        speed3: {
          label: "Speed",
          value: 0.01,
          min: 0.01,
          max: 0.04,
          step: 0.001,
          onChange: (value) => handelSpeed(2, value),
        },
        radius3: {
          label: "Radius",
          value: 150,
          min: 10,
          max: 300,
          onChange: (value) => handelRadius(2, value),
        },
        startColor3: {
          label: "Start color",
          value: "#4F1500",
          onChange: (value) => handelStartColor(2, value),
        },
        endColor3: {
          label: "End color",
          value: "#0029FF",
          onChange: (value) => handelEndColor(2, value),
        },
        life3: {
          label: "Life",
          value: 3,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handelLife(2, value),
        },
        enableRandomDrift3: {
          label: "Enable Random Drift",
          value: false,
          onChange: (value) => handelRandomDriftCheck(2, value),
        },
        randomDrift3: {
          label: "Random Drift",
          value: {
            x: 1,
            y: 1,
          },
          min: -30,
          max: 30,
          render: (get) => get("Third.enableRandomDrift3"),
          onChange: (value) => handelRandomDrift(2, value),
        },
        randomDriftSpeed3: {
          label: "Random Drift Speed",
          value: 0.03,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("Third.enableRandomDrift3"),
          onChange: (value) => handelRandomDriftSpeed(2, value),
        },
        alpha3: {
          label: "Alpha",
          value: 0.8,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handelAlpha(2, value),
        },
        enableScale3: {
          label: "Enable Scale",
          value: false,
        },
        scale3: {
          label: "Scale",
          value: 2.5,
          min: 1,
          max: 4,
          step: 0.5,
          render: (get) => get("Third.enableScale3"),
          onChange: (value) => handelScale(2, value),
        },
      },
      {
        render: (get) => get("numberOfBlobs") >= 3,
      }
    ),
  });

  return null;
};

export default LevaModal;
