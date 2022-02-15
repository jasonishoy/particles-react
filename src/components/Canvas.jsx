import React, { useEffect, useRef } from "react";

const Canvas = ({
  onCanvasInited,
  onResize,
  onMouseDown,
  onMouseUp
}) => {
  const canvasRef = useRef();

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    onCanvasInited && onCanvasInited(canvas);
  }

  const resize = () => {
    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    onResize && onResize(width, height);
  }

  const handleMouseDown = (e) => {
    onMouseDown && onMouseDown(e);
  }

  const handleMouseUp = (e) => {
    onMouseUp && onMouseUp(e);
  }

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="canvas"
      />
    </div>
  );
}

export default Canvas;