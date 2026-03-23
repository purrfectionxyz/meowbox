import { notFound } from "next/navigation";
import type React from "react";
import { getUserByName, getUserStyles } from "~/server/db/queries";

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

  const userStyles = await getUserStyles(user.id);

  return (
    <div
      style={
        {
          "--bg": userStyles.background,
          "--fg": userStyles.foreground,
        } as React.CSSProperties
      }
      className="mx-auto max-w-md bg-(--bg) px-4 py-4 text-(--fg)"
    >
      <h1 className="text-2xl">{user.name}</h1>
      <p>bio....</p>
    </div>
  );
}
