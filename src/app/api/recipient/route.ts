import { extractBody } from "@/utils/extractBody";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { recipient_name, uid } = body;
    const sqlStatement = sql(
      "insert into recipient (recipient_name, uid) values ($1, $2)",
      [recipient_name, uid]
    );
    await sqlStatement;
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in recipient submission: ${e}`, {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { favourite, rid } = body;
    const sqlStatement = sql(
      "UPDATE recipient SET favourite = $1 WHERE rid = $2",
      [favourite, rid]
    );
    await sqlStatement;
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in recipient submission: ${e}`, {
      status: 500,
    });
  }
}
