import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Connect } from "@/utils/db";
import userModel from "@/model/userModel";

// Use async function for the POST method and export it
export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password, phone } = body;

    const db = await Connect();
    const isUserPresent = await userModel.findOne({ email });
    if (isUserPresent) {
      return NextResponse.json(
        { success: false, message: "User already exists!!" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
