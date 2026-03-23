import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), username()],
  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
        defaultValue: "this user has not set a bio :3",
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
