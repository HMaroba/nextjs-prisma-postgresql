import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const isUserExisting = await prisma.user.findFirst({ where: { email } });
    if (isUserExisting)
      return NextResponse.json(
        { success: false, message: "User Already Exists...!" },
        { status: 422 }
      );

    const salt = await genSalt(10);
    const hashed = await hash(password, salt);

    await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
