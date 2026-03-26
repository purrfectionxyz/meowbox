"use server";

import { headers } from "next/headers";
import { db } from "~/server/db";
import { drawing } from "~/server/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { createHash } from "crypto";

export async function submitDrawing(
  userId: string,
  img: string,
): Promise<{ success: boolean; message: string }> {
  if (!userId) return { success: false, message: "Invalid userId" };
  if (!img || img.length < 10)
    return { success: false, message: "Invalid image" };

  if (img.length > 500_000) {
    return { success: false, message: "Image too large" };
  }

  const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");

  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0] ??
    headersList.get("x-real-ip") ??
    "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  const userAgent = headersList.get("user-agent");

  try {
    await db.insert(drawing).values({
      id: createId(),
      userId,
      image: imageBuffer,
      ipHash,
      userAgent,
      isApproved: false,
    });
    return {
      success: true,
      message: "Image sent",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
