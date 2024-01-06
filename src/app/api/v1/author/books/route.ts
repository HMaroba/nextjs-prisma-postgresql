import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { authorId, title, description } = await req.json();

    const isAuthorExisting = await prisma.author.findFirst({
      where: { id: authorId },
    });

    if (!isAuthorExisting) {
      return NextResponse.json(
        { success: false, message: "Author does not exist!" },
        { status: 422 }
      );
    }

    await prisma.book.create({
      data: { authorId, title, description },
    });

    return NextResponse.json(
      { success: true, message: "Book created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // const { authorId } = await req.json;

    const booksByAuthor = await prisma.book.findMany();

    return NextResponse.json(
      { success: true, data: booksByAuthor },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
