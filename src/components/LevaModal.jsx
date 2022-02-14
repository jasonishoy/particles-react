import { useControls } from "leva";

/*
  width, height, radius, start colder, end color - line 37-42 in Particles.jsx
  Mass, Life, Body, Radius, RandomDrifit, Alpha, Color, Scale, Attraction values - line 70-87 in Particles.jsx
*/

const LevaModal = ({ handelChanges }) => {
  const { radius, startColor, endColor } = useControls({
    radius: { value: 170, onChange: (v) => handelChanges({radius: v}), transient: false },
    startColor: { r: 200, b: 200, g: 106, a: 0.4 },
    endColor: { r: 200, b: 125, g: 106, a: 0.4 },
    mass: 1,
    life: 1,
  });
  return radius;
}
export default LevaModal;