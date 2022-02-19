import { useState } from "react";
import { useControls, folder, button } from "leva";

/* 
  - Updating isn't working as expected
  - doesn't  show the name in the list after adding it      ---> Done
  - the speed increases for ever when changing the config    ---> Done
  - LevaModal doesn't update the GUI when changing the config
*/
const LevaModal = ({
  blobs,
  numberofBlobs,
  configsNames,
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
  handleSaving,
  handleLoading,
}) => {
  let blobsNumber = numberofBlobs;
  let name = "";
  const [, set] = useControls(() => ({
    SavedConfigs: {
      label: "Saved Configs",
      options: configsNames,
      render: () => configsNames.length !== 0,
      onChange: (value) => {
        value === undefined && configsNames.length ? handleLoading(configsNames[0]) : handleLoading(value);
        set({ numberOfBlobs: numberofBlobs });
      },
    },
    configName: {
      label: "Name",
      value: name,
      onChange: (value) => (name = value)
    },
    Save: button(() => {
      !name.length && alert("Name can't be empty");
      name.length &&
        handleSaving(name, {
          blobs_number: blobsNumber,
          blobs,
        }) &&
        set({ configName: "" });
    }),
    numberOfBlobs: {
      label: "Number of blobs",
      value: numberofBlobs,
      min: 1,
      max: 3,
      step: 1,
      onChange: (value) => {
        blobsNumber = value;
        return handlenumberOfBlobs(value);
      },
    },
    First: folder({
      speed1: {
        label: "Speed",
        value: blobs[0].speed * 100.0,
        min: -10,
        max: 10,
        step: 1,
        onChange: (value) => handleSpeed(0, value),
      },
      radius1: {
        label: "Radius",
        value: blobs[0].radius,
        min: 10,
        max: 300,
        onChange: (value) => handleRadius(0, value),
      },
      startColor1: {
        label: "Start color",
        value: blobs[0].startColor,
        onChange: (value) => handleStartColor(0, value),
      },
      endColor1: {
        label: "End color",
        value: blobs[0].endColor,
        onChange: (value) => handleEndColor(0, value),
      },
      life1: {
        label: "Life",
        value: blobs[0].life,
        min: 1,
        max: 12,
        step: 1,
        onChange: (value) => handleLife(0, value),
      },
      enableRandomDrift1: {
        label: "Enable Random Drift",
        value: blobs[0].randomDriftCheck,
        onChange: (value) => handleRandomDriftCheck(0, value),
      },
      randomDrift1: {
        label: "Random Drift",
        value: blobs[0].randomDrift,
        min: -20,
        max: 20,
        render: (get) => get("First.enableRandomDrift1"),
        onChange: (value) => handleRandomDrift(0, value),
      },
      randomDriftSpeed1: {
        label: "Random Drift Speed",
        value: blobs[0].randomDriftSpeed,
        min: 0.01,
        max: 1,
        step: 0.01,
        render: (get) => get("First.enableRandomDrift1"),
        onChange: (value) => handleRandomDriftSpeed(0, value),
      },
      alpha1: {
        label: "Alpha",
        value: blobs[0].alpha,
        min: 0.1,
        max: 1,
        step: 0.1,
        onChange: (value) => handleAlpha(0, value),
      },
      enableScale1: {
        label: "Enable Scale",
        value: blobs[0].enableScale,
        onChange: (value) => {
          handleEnableScale(0, value);
          if (!value) {
            set({
              scale1: 2.5,
            });
          }
        },
      },
      scale1: {
        label: "Scale",
        value: blobs[0].scale,
        min: 1,
        max: 4,
        step: 0.5,
        render: (get) => get("First.enableScale1"),
        onChange: (value) => handleScale(0, value),
      },
    }),
    Second: folder(
      {
        speed2: {
          label: "Speed",
          value: blobs[1].speed * 100.0,
          min: -10,
          max: 10,
          step: 1,
          onChange: (value) => handleSpeed(1, value),
        },
        radius2: {
          label: "Radius",
          value: blobs[1].radius,
          min: 10,
          max: 300,
          onChange: (value) => handleRadius(1, value),
        },
        startColor2: {
          label: "Start color",
          value: blobs[1].startColor,
          onChange: (value) => handleStartColor(1, value),

        },
        endColor2: {
          label: "End color",
          value: blobs[1].endColor,
          onChange: (value) => handleEndColor(1, value),
        },
        life2: {
          label: "Life",
          value: blobs[1].life,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handleLife(1, value),
        },
        enableRandomDrift2: {
          label: "Enable Random Drift",
          value: blobs[1].randomDriftCheck,
          onChange: (value) => handleRandomDriftCheck(1, value),
        },
        randomDrift2: {
          label: "Random Drift",
          value: blobs[1].randomDrift,
          min: -20,
          max: 20,
          render: (get) => get("Second.enableRandomDrift2"),
          onChange: (value) => handleRandomDrift(1, value),
        },
        randomDriftSpeed2: {
          label: "Random Drift Speed",
          value: blobs[1].randomDriftSpeed,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("Second.enableRandomDrift2"),
          onChange: (value) => handleRandomDriftSpeed(1, value),
        },
        alpha2: {
          label: "Alpha",
          value: blobs[1].alpha,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handleAlpha(1, value),

        },
        enableScale2: {
          label: "Enable Scale",
          value: blobs[1].enableScale,
          onChange: (value) => {
            handleEnableScale(1, value);
            if (!value) {
              set({
                scale2: 2.5,
              });
            }
          },

        },
        scale2: {
          label: "Scale",
          value: blobs[1].scale,
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
          value: blobs[2].speed * 100.0,
          min: -10,
          max: 10,
          step: 1,
          onChange: (value) => handleSpeed(2, value),

        },
        radius3: {
          label: "Radius",
          value: blobs[2].radius,
          min: 10,
          max: 300,
          onChange: (value) => handleRadius(2, value),

        },
        startColor3: {
          label: "Start color",
          value: blobs[2].startColor,
          onChange: (value) => handleStartColor(2, value),

        },
        endColor3: {
          label: "End color",
          value: blobs[2].endColor,
          onChange: (value) => handleEndColor(2, value),

        },
        life3: {
          label: "Life",
          value: blobs[2].life,
          min: 1,
          max: 12,
          step: 1,
          onChange: (value) => handleLife(2, value),

        },
        enableRandomDrift3: {
          label: "Enable Random Drift",
          value: blobs[2].randomDriftCheck,
          onChange: (value) => handleRandomDriftCheck(2, value),
        },
        randomDrift3: {
          label: "Random Drift",
          value: blobs[2].randomDrift,
          min: -20,
          max: 20,
          render: (get) => get("Third.enableRandomDrift3"),
          onChange: (value) => handleRandomDrift(2, value),
        },
        randomDriftSpeed3: {
          label: "Random Drift Speed",
          value: blobs[2].randomDriftSpeed,
          min: 0.01,
          max: 1,
          step: 0.01,
          render: (get) => get("Third.enableRandomDrift3"),
          onChange: (value) => handleRandomDriftSpeed(2, value),

        },
        alpha3: {
          label: "Alpha",
          value: blobs[2].alpha,
          min: 0.1,
          max: 1,
          step: 0.1,
          onChange: (value) => handleAlpha(2, value),

        },
        enableScale3: {
          label: "Enable Scale",
          value: blobs[2].enableScale,
          onChange: (value) => {
            handleEnableScale(2, value);
            if (!value) {
              set({
                scale3: 2.5,
              });
            }
          },

        },
        scale3: {
          label: "Scale",
          value: blobs[2].scale,
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
  }), [ blobs, numberofBlobs, configsNames ]);
  set({
    speed1: blobs[0].speed * 100,
    radius1: blobs[0].radius,
    startColor1: blobs[0].startColor,
    endColor1: blobs[0].endColor,
    life1: blobs[0].life,
    enableRandomDrift1: blobs[0].randomDriftCheck,
    randomDrift1: blobs[0].randomDrift,
    randomDriftSpeed1: blobs[0].randomDriftSpeed,
    alpha1: blobs[0].alpha,
    enableScale1: blobs[0].enableScale,
    scale1: blobs[0].scale,
  })
  set({
    speed2: blobs[1].speed * 100,
    radius2: blobs[1].radius,
    startColor2: blobs[1].startColor,
    endColor2: blobs[1].endColor,
    life2: blobs[1].life,
    enableRandomDrift2: blobs[1].randomDriftCheck,
    randomDrift2: blobs[1].randomDrift,
    randomDriftSpeed2: blobs[1].randomDriftSpeed,
    alpha2: blobs[1].alpha,
    enableScale2: blobs[1].enableScale,
    scale2: blobs[1].scale,
  })
  set({
    speed3: blobs[2].speed * 100,
    radius3: blobs[2].radius,
    startColor3: blobs[2].startColor,
    endColor3: blobs[2].endColor,
    life3: blobs[2].life,
    enableRandomDrift3: blobs[2].randomDriftCheck,
    randomDrift3: blobs[2].randomDrift,
    randomDriftSpeed3: blobs[2].randomDriftSpeed,
    alpha3: blobs[2].alpha,
    enableScale3: blobs[2].enableScale,
    scale3: blobs[2].scale,
  })
  return null;
};

export default LevaModal;
