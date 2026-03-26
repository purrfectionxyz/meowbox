"use client";

import { Button } from "./ui/button";

export function SaveButton({ image }: { image: string }) {
  function handleSave() {
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";
    link.click();
  }

  return (
    <Button onClick={handleSave} size={"sm"}>
      Download
    </Button>
  );
}
