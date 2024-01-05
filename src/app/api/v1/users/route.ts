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

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany();

    return NextResponse.json(
      { success: true, data: allUsers },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name } = await req.json();

    await prisma.user.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json({ msg: "Profile updated successfully" });
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}
