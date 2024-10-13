"use server";

import { cookies } from "next/headers";
import userModel from "@/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { TextEncoder } from "util";
import { Connect } from "@/utils/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    ////connect to Db
    const db = await Connect();

    // Check if user with the provided email exists
    const checkUserWithEmail = await userModel.findOne({ email });
    if (!checkUserWithEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      checkUserWithEmail.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid Email or Password",
        },
        { status: 403 }
      );
    }

    // Create a token payload
    const tokenData = {
      id: checkUserWithEmail._id,
      role: checkUserWithEmail.role,
    };
    const secretKey = new TextEncoder().encode(process.env.JWTSECRET);
    // Sign JWT token
    const token = await new SignJWT({ tokenData })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Specify the algorithm and type
      .setIssuedAt() // Set the issue time to now
      .setExpirationTime("1d") // Set the expiration time (e.g., 1 day)
      .sign(secretKey);
    const user = await userModel.findOne({ email }).select("-password");

    // Send response with token
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successfull",
        token,
        user,
      },
      { status: 200 }
    );
    // Set cookie with token
    cookies().set("token", token, { httpOnly: true, path: "/", maxAge: 86400 });
    return response;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
