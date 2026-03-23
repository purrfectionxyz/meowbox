"use client";

import { authClient } from "~/server/auth/client";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  function signOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
          router.refresh();
        },
      },
    });
  }

  if (isPending) {
    return (
      <Button disabled>
        <Spinner />
      </Button>
    );
  }

  if (!session) {
    return (
      <Button asChild>
        <Link href={"/auth/login"}>Login</Link>
      </Button>
    );
  }

  return (
    <form onSubmit={() => signOut()}>
      <Button>Logout</Button>
    </form>
  );
}
