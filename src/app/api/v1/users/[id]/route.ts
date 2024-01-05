import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  try {
    const users = await prisma.user.findFirst({
      where: { id: Number(id) },
    });

    return NextResponse.json(users);
  } catch (error) {
    return new NextResponse("Something went wrong" + error, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  try {
    await prisma.users.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ msg: "User deleted successfully" });
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
