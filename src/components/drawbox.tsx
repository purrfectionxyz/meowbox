"use client";

import { useDrawBox } from "~/hooks/useDrawBox";

export default function DrawBox({
  onSubmit,
}: {
  onSubmit?: (img: string) => void;
}) {
  const {
    canvasRef,
    startDrawing,
    stopDrawing,
    draw,
    clear,
    getImage,
    color,
    setColor,
    size,
    setSize,
  } = useDrawBox();

  return (
    <div className="space-y-3">
      {/* 🎨 Controls */}
      <div className="flex items-center gap-3">
        {/* Colour picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        {/* Brush size */}
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />

        <span className="text-sm">{size}px</span>
      </div>

      {/* 🖌️ Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={draw}
        className="h-[300px] w-[400px] rounded-lg border bg-white"
      />

      {/* 🔘 Actions */}
      <div className="flex gap-2">
        <button onClick={clear}>Clear</button>
        <button onClick={() => onSubmit?.(getImage())}>Submit</button>
      </div>
    </div>
  );
}
