import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, title, description } = await req.json();

    const isUserExisting = await prisma.user.findFirst({ where: { userId } });
    if (!isUserExisting)
      return NextResponse.json(
        { success: false, message: "User does not Exists...!" },
        { status: 422 }
      );

    await prisma.user.create({
      data: { userId, title, description },
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
