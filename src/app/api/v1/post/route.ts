import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, title, description } = await req.json();

    const post = await prisma.post.create({
      data: { userId, title, description },
    });

    console.log(post);

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
