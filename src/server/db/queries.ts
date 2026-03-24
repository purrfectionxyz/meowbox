"use server";

import { db } from ".";
import type { StylesType } from "./schema";

export async function getUserByName(username: string) {
  return await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });
}

export async function getUserStyles(id: string): Promise<StylesType> {
  const response = await db.query.userStyles.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  const styles: StylesType = response?.styles ?? {
    background: "#fff",
    foreground: "#000",
    font: "sans",
  };

  return styles;
}

export async function getUserDrawings(userId: string, max?: number) {
  return await db.query.drawing.findMany({
    where: (t, { eq }) => eq(t.userId, userId) && eq(t.isApproved, true),
    limit: max,
  });
}
