import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    const isAuthorExisting = await prisma.author.findFirst({
      where: { email },
    });

    if (isAuthorExisting) {
      return NextResponse.json(
        { success: false, message: "Author already exists!" },
        { status: 422 }
      );
    }

    await prisma.author.create({
      data: { name, email },
    });

    return NextResponse.json(
      { success: true, message: "Author created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}

export async function GET() {
  try {
    const allAuthors = await prisma.author.findMany();
    return NextResponse.json({ success: true, authors: allAuthors });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong" + error,
      status: 500,
    });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const { email } = await req.json();

//     const getPosts = await prisma.author.findMany({
//       where: { email },
//     });

//     return NextResponse.json(getPosts);
//   } catch (error) {
//     return NextResponse.json({
//       message: "Something went wrong" + error,
//       success: false,
//     });
//   }
// }
