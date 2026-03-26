import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getSession } from "~/server/auth/server";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="h-full min-h-screen w-full">
      {/* {session ? <p>signed in as {session.user.name}</p> : <p>not signed in</p>} */}

      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-4xl font-semibold">meowbox</h1>
        <p>the best embeddable drawbox solution for your site</p>

        <div className="flex flex-col gap-2 py-4 md:flex-row">
          {session ? (
            <Button asChild>
              <Link href="/dash">View dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
