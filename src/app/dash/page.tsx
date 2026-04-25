import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthButtons } from "~/components/auth/auth-buttons";
import { Button } from "~/components/ui/button";
import { uint8ToDataUrl } from "~/lib/image";
import { getSession } from "~/server/auth/server";
import { getUserDrawings } from "~/server/db/queries";

import { Trash2, Flag } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const drawings = await getUserDrawings(session.user.id);

  return (
    <div className="mx-auto min-h-screen max-w-md px-4">
      <header className="mx-auto flex max-w-md flex-row items-center justify-between py-2">
        <strong>meowbox dashboard</strong>
        <nav>
          <AuthButtons
            extraLink={{
              href: `/u/${session.user.username}`,
              text: "View profile",
            }}
          />
        </nav>
      </header>
      <div className="space-y-2 pt-4 text-center">
        <h1 className="text-2xl">Welcome back, @{session.user.username}!</h1>
        <Button asChild>
          <Link href="/dash/settings">Edit settings</Link>
        </Button>
      </div>

      <hr className="mt-4" />

      <div className="py-4">
        <h2 className="text-center text-xl">Your Drawings</h2>
        <div className="flex flex-col items-center divide-y divide-solid">
          {drawings.length > 0 &&
            drawings.map((drawing) => (
              <div key={drawing.id} className="pt-4 pb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uint8ToDataUrl(drawing.image)}
                  className="border-border rounded-lg border"
                  alt="User-submitted drawing"
                />
                <div className="flex flex-row items-center justify-between p-1">
                  <p className="text-muted-foreground text-center text-sm">
                    Submitted at{" "}
                    {new Date(drawing.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <div className="flex flex-row items-center gap-1">
                    <Button variant={"destructive"}>
                      <Trash2 />
                    </Button>
                    <Button variant={"destructive"}>
                      <Flag />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {drawings.length === 0 && <p>No images submitted yet!</p>}
        </div>
      </div>
    </div>
  );
}
