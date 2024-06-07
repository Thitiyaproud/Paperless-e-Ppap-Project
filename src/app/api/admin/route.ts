import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { z } from "zod"

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(30),
    email: z.string().min(1, "Email is required").max(35),
    password: z.string().min(6, "Password must have than 6 characters").max(30),
});

const prisma = new PrismaClient();

export async function GET() {
    return NextResponse.json(await prisma.user.findMany());
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // check email
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });

    } catch (error) {
        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        let errorMessage = "An error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}

