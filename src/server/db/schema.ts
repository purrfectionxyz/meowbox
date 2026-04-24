import { defineRelations, type InferSelectModel } from "drizzle-orm";
import {
  boolean,
  index,
  mysqlTable,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
  blob,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),

  username: varchar("username", { length: 255 }).unique(),
  displayUsername: text("display_username"),

  bio: varchar("bio", { length: 100 }),

  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

// DRAWBOX STUFF
export const drawing = mysqlTable(
  "drawing",
  (t) => ({
    id: t.varchar("id", { length: 36 }).primaryKey(),
    userId: t.varchar("user_id", { length: 36 }).references(() => user.id),

    image: t.blob("image").notNull(),

    isApproved: t.boolean("is_approved").default(false),

    ipHash: t.varchar("ip_hash", { length: 255 }).notNull(),
    userAgent: t.text("user_agent"),

    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    deletedAt: t.timestamp("deleted_at"),
  }),
  (t) => [
    index("user_idx").on(t.userId),
    index("ip_idx").on(t.ipHash),
    index("created_idx").on(t.createdAt),
  ],
);
export type Drawing = InferSelectModel<typeof drawing>;

export const userStyles = mysqlTable("user_style", (t) => ({
  id: t
    .varchar("id", { length: 36 })
    .notNull()
    .primaryKey()
    .references(() => user.id),
  styles: t.json("styles").$type<StylesType>(),
}));
export type StylesType = {
  background: string;
  foreground: string;
  font: "Geist" | "Nunito Sans" | "Times New Roman";
};
