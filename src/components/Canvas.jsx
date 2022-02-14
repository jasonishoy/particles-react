import React from "react";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.initCanvas();
    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
  }

  initCanvas() {
    const canvas = this.canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    this.props.onCanvasInited && this.props.onCanvasInited(canvas);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize() {
    const canvas = this.canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    this.props.onResize && this.props.onResize(width, height);
  }

  handleMouseDown(e) {
    this.props.onMouseDown && this.props.onMouseDown(e);
  }

  handleMouseUp(e) {
    this.props.onMouseUp && this.props.onMouseUp(e);
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          className="canvas"
        />
      </div>
    );
  }
}
