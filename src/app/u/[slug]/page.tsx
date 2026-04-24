import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { AuthButtons } from "~/components/auth/auth-buttons";
import DrawBox from "~/components/drawbox";
import { SaveButton } from "~/components/save-button";
import { Button } from "~/components/ui/button";
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
      className="min-h-screen bg-(--bg) font-(family-name:--font) text-(--fg)"
    >
      <header className="mx-auto flex max-w-md flex-row items-center justify-between px-4 py-2">
        <strong>meowbox</strong>
        <nav>
          <AuthButtons extraLink={{ href: "/dash", text: "Dashboard" }} />
        </nav>
      </header>
      <div className="mx-auto max-w-md px-4">
        <div className="pb-2">
          <h1 className="text-2xl">@{user.name}</h1>
          <p>{user.bio}</p>
        </div>
        <div className="py-2">
          <DrawBox userId={user.id} />
        </div>
      </div>
    </div>
  );
}
