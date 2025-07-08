import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("debugchi_front");
    const result = await db.collection("support").insertOne(body);
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



export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("debugchi_front");


    const phone = req.nextUrl.searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // جستجو در کالکشن support براساس phone
    const results = await db
      .collection("support")
      .find({ phone })
      .toArray();

    return NextResponse.json({ data: results }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch support requests" },
      { status: 500 }
    );
  }
}