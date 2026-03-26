import Link from "next/link";
import { RegisterForm } from "~/components/auth/register-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function RegisterPage() {
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
          <CardTitle>Register for meowbox</CardTitle>
          <CardDescription>Ready to get your meowbox?</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Button variant={"link"} className="px-0" asChild>
              <Link href={"/auth/login"}>Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
