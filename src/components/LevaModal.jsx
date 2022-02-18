import { useControls, folder, button } from "leva";

const LevaModal = ({
  handlenumberOfBlobs,
  handleSpeed,
  handleRadius,
  handleStartColor,
  handleEndColor,
  handleLife,
  handleRandomDriftCheck,
  handleRandomDrift,
  handleRandomDriftSpeed,
  handleAlpha,
  handleScale,
  handleEnableScale,
}) => {
  useControls({
    SavedConfigs: {
      label: "Saved Configs",
      options : {
        "config1": {},
        "config2": {},
      }
    },
    configName: {
      label: 'Name',
      value: '',
    },
    Save: button(),
    numberOfBlobs: {
      label: "Number of blobs",
      value: 1,
      min: 1,
      max: 3,
      step: 1,
      onChange: (value) => handlenumberOfBlobs(value),
    },
    First: folder(
      {
        speed1: {
          label: "Speed",
          value: 1,
          min: -10,
          max: 10,
          step: 1,
          onChange: (value) => handleSpeed(0, value),
        },
        radius1: {
          label: "Radius",
          value: 150,
          min: 10,
          max: 300,
          onChange: (value) => handleRadius(0, value),
        },
        startColor1: {
          label: "Start color",
          value: "#4F1500",
          onChange: (value) => handleStartColor(0, value),
        },
        endColor1: {
          label: "End color",
          value: "#0029FF",
          onChange: (value) => handleEndColor(0, value),
        },
        life1: {
          label: "Life",
          value: 3,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handleLife(0, value),
        },
        enableRandomDrift1: {
          label: "Enable Random Drift",
          value: false,
          onChange: (value) => handleRandomDriftCheck(0, value),
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
          onChange: (value) => handleRandomDrift(0, value),
        },
        randomDriftSpeed1: {
          label: "Random Drift Speed",
          value: 0.03,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("First.enableRandomDrift1"),
          onChange: (value) => handleRandomDriftSpeed(0, value),
        },
        alpha1: {
          label: "Alpha",
          value: 0.8,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handleAlpha(0, value),
        },
        enableScale1: {
          label: "Enable Scale",
          value: true,
          onChange: (value) => handleEnableScale(0, value),
        },
        scale1: {
          label: "Scale",
          value: 2.5,
          min: 1,
          max: 4,
          step: 0.5,
          render: (get) => get("First.enableScale1"),
          onChange: (value) => handleScale(0, value),
        },
      }
    ),
    Second: folder(
      {
        speed2: {
          label: "Speed",
          value: 1,
          min: -10,
          max: 10,
          step: 1,
          onChange: (value) => handleSpeed(1, value),
        },
        radius2: {
          label: "Radius",
          value: 150,
          min: 10,
          max: 300,
          onChange: (value) => handleRadius(1, value),
        },
        startColor2: {
          label: "Start color",
          value: "#4F1500",
          onChange: (value) => handleStartColor(1, value),
        },
        endColor2: {
          label: "End color",
          value: "#0029FF",
          onChange: (value) => handleEndColor(1, value),
        },
        life2: {
          label: "Life",
          value: 3,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handleLife(1, value),
        },
        enableRandomDrift2: {
          label: "Enable Random Drift",
          value: false,
          onChange: (value) => handleRandomDriftCheck(1, value),
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
          onChange: (value) => handleRandomDrift(1, value),
        },
        randomDriftSpeed2: {
          label: "Random Drift Speed",
          value: 0.03,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("Second.enableRandomDrift2"),
          onChange: (value) => handleRandomDriftSpeed(1, value),
        },
        alpha2: {
          label: "Alpha",
          value: 0.8,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handleAlpha(1, value),
        },
        enableScale2: {
          label: "Enable Scale",
          value: false,
          onChange: (value) => handleEnableScale(1, value),
        },
        scale2: {
          label: "Scale",
          value: 2.5,
          min: 1,
          max: 4,
          step: 0.5,
          render: (get) => get("Second.enableScale2"),
          onChange: (value) => handleScale(1, value),
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
          value: 1,
          min: -10,
          max: 10,
          step: 1,
          onChange: (value) => handleSpeed(2, value),
        },
        radius3: {
          label: "Radius",
          value: 150,
          min: 10,
          max: 300,
          onChange: (value) => handleRadius(2, value),
        },
        startColor3: {
          label: "Start color",
          value: "#4F1500",
          onChange: (value) => handleStartColor(2, value),
        },
        endColor3: {
          label: "End color",
          value: "#0029FF",
          onChange: (value) => handleEndColor(2, value),
        },
        life3: {
          label: "Life",
          value: 3,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handleLife(2, value),
        },
        enableRandomDrift3: {
          label: "Enable Random Drift",
          value: false,
          onChange: (value) => handleRandomDriftCheck(2, value),
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
          onChange: (value) => handleRandomDrift(2, value),
        },
        randomDriftSpeed3: {
          label: "Random Drift Speed",
          value: 0.03,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("Third.enableRandomDrift3"),
          onChange: (value) => handleRandomDriftSpeed(2, value),
        },
        alpha3: {
          label: "Alpha",
          value: 0.8,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handleAlpha(2, value),
        },
        enableScale3: {
          label: "Enable Scale",
          value: false,
          onChange: (value) => handleEnableScale(2, value),
        },
        scale3: {
          label: "Scale",
          value: 2.5,
          min: 1,
          max: 4,
          step: 0.5,
          render: (get) => get("Third.enableScale3"),
          onChange: (value) => handleScale(2, value),
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
