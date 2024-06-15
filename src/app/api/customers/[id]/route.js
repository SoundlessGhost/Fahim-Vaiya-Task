import ConnectDB from "@/lib/ConnectDB";
import { CustomerAddress } from "@/models/Customer.model";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await ConnectDB();

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const deleteCustomerAddress = await CustomerAddress.deleteOne({ _id: id });
    if (!deleteCustomerAddress) {
      return NextResponse.json(
        { message: "Customer Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ deleteCount: 1 }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Customer Address:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to delete Customer Address" },
      { status: 500 }
    );
  }
}
