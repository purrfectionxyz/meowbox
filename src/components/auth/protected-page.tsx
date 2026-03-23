import { redirect } from "next/navigation";
import { getSession } from "~/server/auth/server";

export async function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return children;
}
