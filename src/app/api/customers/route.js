import ConnectDB from "@/lib/ConnectDB";
import { CustomerAddress } from "@/models/Customer.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();
    const customerAddress = await CustomerAddress.find();

    return NextResponse.json(customerAddress, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch customer address:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch Customer Address" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const body = await request.json();

    const NewAddress = await CustomerAddress.create(body);
    return NextResponse.json(NewAddress, { status: 201 });
  } catch (error) {
    console.error("Failed to create customer address:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created New Address" },
      { status: 500 }
    );
  }
}
