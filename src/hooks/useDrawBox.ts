"use client";
import { useRef, useEffect, useState } from "react";

export function useDrawBox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);

  // NEW: settings
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d")!;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  // update brush when settings change
  useEffect(() => {
    if (!ctxRef.current) return;
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = size;
  }, [color, size]);

  const getCoords = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    drawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    drawing.current = false;
    ctxRef.current?.beginPath();
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing.current) return;

    const { x, y } = getCoords(e);

    ctxRef.current!.lineTo(x, y);
    ctxRef.current!.stroke();
    ctxRef.current!.beginPath();
    ctxRef.current!.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    ctxRef.current!.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getImage = () => {
    return canvasRef.current!.toDataURL("image/png");
  };

  return {
    canvasRef,
    startDrawing,
    stopDrawing,
    draw,
    clear,
    getImage,

    // expose controls
    color,
    setColor,
    size,
    setSize,
  };
}
