import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("debugchi_front");
    const users = await db.collection("faq").find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("debugchi_front");
    const result = await db.collection("faq").insertOne(body);
    return NextResponse.json(
      { insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
