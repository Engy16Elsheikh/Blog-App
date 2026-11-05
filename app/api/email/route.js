import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  try {
    await ConnectDB();
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};

export async function POST(request) {
  try {
    await LoadDB();
    const formData = await request.formData();
    const emailData = { email: `${formData.get("email")}` };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, msg: "Failed to subscribe email" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await LoadDB();
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, msg: "Failed to fetch emails" }, { status: 500 });
  }
}
export async function DELETE(request) {
  try {
    await LoadDB();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
    }
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, msg: "Failed to delete email" }, { status: 500 });
  }
}
