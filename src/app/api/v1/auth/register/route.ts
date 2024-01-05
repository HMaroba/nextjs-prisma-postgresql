import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const isUserExisting = await prisma.user.findFirst({ where: { email } });
    if (isUserExisting)
      return new NextResponse("User Already Exists...!", { status: 422 });

    const salt = await genSalt(10);
    const hashed = await hash(password, salt);

    await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return NextResponse.json({ message: "User created successful" });
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
