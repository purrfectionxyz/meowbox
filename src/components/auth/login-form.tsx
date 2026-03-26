"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authClient } from "~/server/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Min 3 characters" })
    .max(25, { message: "Max 25 characters" }),
  password: z.string().min(8, { message: "Must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormData) {
    setLoading(true);
    const { data, error } = await authClient.signIn.username({
      username: values.username,
      password: values.password,
    });

    if (error) {
      setLoading(false);
      toast.error(error.message);
      console.error(error);
      return;
    }

    router.push("/dash");
    toast.success("Logged in successfully :)");
    setLoading(false);
  }

  return (
    <form
      id="register-form"
      className="space-y-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                required
                max={25}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                max={255}
                aria-invalid={fieldState.invalid}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner /> : "Login"}
      </Button>
    </form>
  );
}
