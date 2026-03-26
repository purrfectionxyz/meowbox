import { notFound } from "next/navigation";
import type React from "react";
import DrawBox from "~/components/drawbox";
import { SaveButton } from "~/components/save-button";
import { uint8ToDataUrl } from "~/lib/image";

import {
  getUserByName,
  getUserDrawings,
  getUserStyles,
} from "~/server/db/queries";

export default async function UserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const awaitedParams = await params;

  const user = await getUserByName(awaitedParams.slug);

  if (!user) {
    return notFound();
  }

  const userDrawings = await getUserDrawings(user.id, 10);
  const userStyles = await getUserStyles(user.id);

  return (
    <div
      style={
        {
          "--bg": userStyles.background,
          "--fg": userStyles.foreground,
          "--font": userStyles.font + ", sans-serif",
        } as React.CSSProperties
      }
      className="h-full min-h-screen bg-(--bg) font-(family-name:--font) text-(--fg)"
    >
      <div className="divide-border mx-auto max-w-md divide-y divide-solid px-4 py-4">
        <div className="pb-4">
          <h1 className="text-2xl">@{user.name}</h1>
          <p>{user.bio}</p>
        </div>
        <div className="py-4">
          <DrawBox userId={user.id} />
        </div>
        <div className="py-4">
          <h2 className="text-xl">Recent Drawings</h2>
          <div className="flex flex-col divide-y">
            {userDrawings.map((drawing) => {
              const imageEncoded = uint8ToDataUrl(drawing.image);

              return (
                <div
                  className="flex flex-col justify-center py-2"
                  key={drawing.id}
                >
                  <img className="rounded-xl bg-white" src={imageEncoded} />
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs">
                      Created At:{" "}
                      {new Date(drawing.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <SaveButton image={imageEncoded} />
                  </div>
                </div>
              );
            })}
            {userDrawings.length === 0 && <p>No drawings.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
