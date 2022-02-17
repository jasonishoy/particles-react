import { useControls } from "leva";

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
    "Blobs Number": {
      value: 1,
      min: 1,
      max: 3,
      step: 1,
      onChange: (value) => handelnumberOfBlobs(value),
    },
    "Blob 1 Speed": {
      value: 0.01,
      min: 0.01,
      max: 0.04,
      step: 0.001,
      onChange: (value) => handelSpeed(0, value),
    },
    "Blob 1 Radius": {
      value: 150,
      min: 10,
      max: 300,
      onChange: (value) => handelRadius(0, value),
    },
    "Blob 1 Start color": {
      value: "#4F1500",
      onChange: (value) => handelStartColor(0, value),
    },
    "Blob 1 End color": {
      value: "#0029FF",
      onChange: (value) => handelEndColor(0, value),
    },
    "Blob 1 Life": {
      value: 3,
      min: 1,
      max: 12,
      step: 1,
      onChange: (value) => handelLife(0, value),
    },
    "Blob 1 Enable Random Drift": {
      value: false,
      onChange: (value) => handelRandomDriftCheck(0, value),
    },
    "Blob 1 Random Drift": {
      value: {
        x: 1,
        y: 1,
      },
      min: -30,
      max: 30,
      render: (get) => get("Blob 1 Enable Random Drift"),
      onChange: (value) => handelRandomDrift(0, value),
    },
    "Blob 1 Random Drift Speed": {
      value: 0.03,
      min: 0.01,
      max: 1,
      step: 0.01,
      render: (get) => get("Blob 1 Enable Random Drift"),
      onChange: (value) => handelRandomDriftSpeed(0, value),
    },
    "Blob 1 Alpha": {
      value: 0.8,
      min: 0.1,
      max: 1,
      step: 0.1,
      onChange: (value) => handelAlpha(0, value),
    },
    "Blob 1 Enable Scale": false,
    "Blob 1 Scale": {
      value: 2.5,
      min: 1,
      max: 4,
      step: 0.5,
      render: (get) => get("Blob 1 Enable Scale"),
      onChange: (value) => handelScale(0, value),
    },
    // Second Blob
    "Blob 2 Speed": {
      value: 0.01,
      min: 0.01,
      max: 0.04,
      step: 0.001,
      render: (get) => get("Blobs Number") >= 2,
      onChange: (value) => handelSpeed(1, value),
    },
    "Blob 2 Radius": {
      value: 150,
      min: 10,
      max: 300,
      render: (get) => get("Blobs Number") >= 2,
      onChange: (value) => handelRadius(1, value),
    },
    "Blob 2 Start color": {
      value: "#4F1500",
      render: (get) => get("Blobs Number") >= 2,
      onChange: (value) => handelStartColor(1, value),
    },
    "Blob 2 End color": {
      value: "#0029FF",
      render: (get) => get("Blobs Number") >= 2,
      onChange: (value) => handelEndColor(1, value),
    },
    "Blob 2 Life": {
      value: 3,
      min: 1,
      max: 12,
      step: 1,
      onChange: (value) => handelLife(1, value),
      render: (get) => get("Blobs Number") >= 2,
    },
    "Blob 2 Enable Random Drift": {
      value: false,
      render: (get) => get("Blobs Number") >= 2,
      onChange: (value) => handelRandomDriftCheck(1, value),
    },
    "Blob 2 Random Drift": {
      value: {
        x: 1,
        y: 1,
      },
      min: -30,
      max: 30,
      render: (get) =>
        get("Blob 2 Enable Random Drift") && get("Blobs Number") >= 2,
      onChange: (value) => handelRandomDrift(1, value),
    },
    "Blob 2 Random Drift Speed": {
      value: 0.03,
      min: 0.01,
      max: 1,
      step: 0.01,
      render: (get) =>
        get("Blob 2 Enable Random Drift") && get("Blobs Number") >= 2,
      onChange: (value) => handelRandomDriftSpeed(1, value),
    },
    "Blob 2 Alpha": {
      value: 0.8,
      min: 0.1,
      max: 1,
      step: 0.1,
      render: (get) => get("Blobs Number") >= 2,
      onChange: (value) => handelAlpha(1, value),
    },
    "Blob 2 Enable Scale": {
      value: false,
      render: (get) => get("Blobs Number") >= 2,
    },
    "Blob 2 Scale": {
      value: 2.5,
      min: 1,
      max: 4,
      step: 0.5,
      render: (get) => get("Blob 2 Enable Scale") && get("Blobs Number") >= 2,
      onChange: (value) => handelScale(1, value),
    },
    // Third Blob
    "Blob 3 Speed": {
      value: 0.01,
      min: 0.01,
      max: 0.04,
      step: 0.001,
      render: (get) => get("Blobs Number") === 3,
      onChange: (value) => handelSpeed(2, value),
    },
    "Blob 3 Radius": {
      value: 150,
      min: 10,
      max: 300,
      render: (get) => get("Blobs Number") === 3,
      onChange: (value) => handelRadius(2, value),
    },
    "Blob 3 Start color": {
      value: "#4F1500",
      render: (get) => get("Blobs Number") === 3,
      onChange: (value) => handelStartColor(2, value),
    },
    "Blob 3 End color": {
      value: "#0029FF",
      render: (get) => get("Blobs Number") === 3,
      onChange: (value) => handelEndColor(2, value),
    },
    "Blob 3 Life": {
      value: 3,
      min: 1,
      max: 12,
      step: 1,
      onChange: (value) => handelLife(2, value),
      render: (get) => get("Blobs Number") === 3,
    },
    "Blob 3 Enable Random Drift": {
      value: false,
      render: (get) => get("Blobs Number") === 3,
      onChange: (value) => handelRandomDriftCheck(2, value),
    },
    "Blob 3 Random Drift": {
      value: {
        x: 1,
        y: 1,
      },
      min: -30,
      max: 30,
      render: (get) =>
        get("Blob 3 Enable Random Drift") && get("Blobs Number") === 3,
      onChange: (value) => handelRandomDrift(2, value),
    },
    "Blob 3 Random Drift Speed": {
      value: 0.03,
      min: 0.01,
      max: 1,
      step: 0.01,
      render: (get) =>
        get("Blob 3 Enable Random Drift") && get("Blobs Number") === 3,
      onChange: (value) => handelRandomDriftSpeed(2, value),
    },
    "Blob 3 Alpha": {
      value: 0.8,
      min: 0.1,
      max: 1,
      step: 0.1,
      render: (get) => get("Blobs Number") === 3,
      onChange: (value) => handelAlpha(2, value),
    },
    "Blob 3 Enable Scale": {
      value: false,
      render: (get) => get("Blobs Number") === 3,
    },
    "Blob 3 Scale": {
      value: 2.5,
      min: 1,
      max: 4,
      step: 0.5,
      render: (get) => get("Blob 3 Enable Scale") && get("Blobs Number") === 3,
      onChange: (value) => handelScale(2, value),
    },
  });
  return null;
};

export default LevaModal;
