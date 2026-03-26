import Link from "next/link";
import { LoginForm } from "~/components/auth/login-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function LoginPage() {
  return (
    <div>
      <div className="py-12 text-center">
        <h1 className="text-2xl font-semibold">meowbox</h1>
        <Button variant="link" asChild>
          <Link href="/">Back Home</Link>
        </Button>
      </div>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Login to meowbox</CardTitle>
          <CardDescription>Welcome back, meow!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account?{" "}
            <Button variant={"link"} className="px-0" asChild>
              <Link href={"/auth/register"}>Join Today!</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
