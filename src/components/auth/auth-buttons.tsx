"use client";

import { authClient } from "~/server/auth/client";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthButtons({
  extraLink,
}: {
  extraLink?: { href: string; text: string };
}) {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  function signOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
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
    <>
      {extraLink && (
        <Button asChild>
          <Link href={extraLink.href}>{extraLink.text}</Link>
        </Button>
      )}
      <Button onClick={signOut}>Logout</Button>
    </>
  );
}
