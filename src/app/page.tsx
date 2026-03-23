import { getSession } from "~/server/auth/server";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main>
      {session ? <p>signed in as {session.user.name}</p> : <p>not signed in</p>}
    </main>
  );
}
