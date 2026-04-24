"use server";

import { db } from ".";
import type { StylesType } from "./schema";

export async function getUserByName(username: string) {
  return await db.query.user.findFirst({
    where: {
      username,
    },
  });
}

export async function getUserStyles(id: string): Promise<StylesType> {
  const response = await db.query.userStyles.findFirst({
    where: {
      id,
    },
  });

  const styles: StylesType = response?.styles ?? {
    background: "#fff",
    foreground: "#000",
    font: "Geist",
  };

  return styles;
}

export async function getUserDrawings(userId: string, max?: number) {
  return await db.query.drawing.findMany({
    where: {
      userId,
      isApproved: true,
    },
    limit: max,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserPendingDrawings(userId: string, max?: number) {
  return await db.query.drawing.findMany({
    where: {
      userId,
      isApproved: false,
    },
    limit: max,
    orderBy: {
      createdAt: "asc",
    },
  });
}
