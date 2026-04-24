import { redirect } from "next/navigation";
import { AuthButtons } from "~/components/auth/auth-buttons";
import { uint8ToDataUrl } from "~/lib/image";
import { getSession } from "~/server/auth/server";
import { getUserDrawings, getUserPendingDrawings } from "~/server/db/queries";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const drawings = await getUserDrawings(session.user.id);

  return (
    <div className="mx-auto min-h-screen max-w-md">
      <header className="mx-auto flex max-w-md flex-row items-center justify-between px-4 py-2">
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
      <div className="flex flex-col items-center divide-y divide-solid py-4">
        {drawings.map((drawing) => (
          <div key={drawing.id} className="pt-4 pb-2">
            <img
              src={uint8ToDataUrl(drawing.image)}
              className="border-border rounded-lg border"
            />
            <p className="text-muted-foreground p-1 text-center text-sm">
              Submitted at{" "}
              {new Date(drawing.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
