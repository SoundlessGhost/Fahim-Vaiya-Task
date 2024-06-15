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

    if (Array.isArray(body)) {
      const NewAddresses = await CustomerAddress.insertMany(body);
      return NextResponse.json(NewAddresses, { status: 201 });
    } else {
      const newAddress = await CustomerAddress.create(body);
      return NextResponse.json(newAddress, { status: 201 });
    }
  } catch (error) {
    console.error("Failed to create customer addresses:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to create new addresses." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await ConnectDB();
    await CustomerAddress.deleteMany({});

    return NextResponse.json(
      { message: "All customer addresses have been deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete customer addresses:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to delete customer addresses." },
      { status: 500 }
    );
  }
}
