import { RegisterForm } from "~/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function RegisterPage() {
  return (
    <div className="py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Register for meowbox</CardTitle>
          <CardDescription>Ready to get your meowbox?</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
