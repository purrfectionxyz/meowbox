"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitDrawing } from "~/actions/submit-drawing";
import { useDrawBox } from "~/hooks/useDrawBox";
import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

function isCanvasBlank(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return true;

  const pixelBuffer = new Uint32Array(
    ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer,
  );

  return !pixelBuffer.some((color) => color !== 0);
}

export default function DrawBox({ userId }: { userId: string }) {
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

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit() {
    setLoading(true);

    const img = getImage();

    console.log(img);

    if (isCanvasBlank(canvasRef.current!)) {
      toast.error("Please actually draw something T-T");
      setLoading(false);
      return;
    }

    const res = await submitDrawing(userId, img);

    if (!res.success) {
      toast.error(res.message);
      setLoading(false);
      return;
    }

    toast.success(res.message);
    clear();
    setLoading(false);
  }

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
      <div className="flex gap-1">
        <Button onClick={clear} disabled={loading}>
          Clear
        </Button>
        <Button onClick={async () => await onSubmit()} disabled={loading}>
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </div>
    </div>
  );
}
