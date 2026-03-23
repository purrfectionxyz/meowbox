"use client";

import DrawBox from "./drawbox";

export default function DrawBoxWrapper() {
  return (
    <DrawBox
      onSubmit={(img) => {
        console.log(img);
      }}
    />
  );
}
