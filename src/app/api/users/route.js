import ConnectDB from "@/lib/ConnectDB";
import { User } from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const user = await User.find();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to get user:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();

    const NewUser = await User.create(body);
    return NextResponse.json(NewUser, { status: 201 });
  } catch (error) {
    console.error("Failed to Create New User:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created New User" },
      { status: 500 }
    );
  }
}
