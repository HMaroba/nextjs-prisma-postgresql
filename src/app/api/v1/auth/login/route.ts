import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
