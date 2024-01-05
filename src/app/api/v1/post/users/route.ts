import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const userIdString = headers().get("userid");

    // Check if userId is provided in headers
    if (!userIdString) {
      return new NextResponse("UserId not provided in headers", {
        status: 400,
      });
    }

    const userId = parseInt(userIdString, 10);

    const allposts = await prisma.post.findMany({
      where: { userId },
    });

    return NextResponse.json(allposts);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
