import { Params } from "@/utils/interface";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const id = params.params.id;
    const recipients = sql(
      "select rid, recipient_name, favourite from recipient where uid = $1",
      [id]
    );
    const array = await recipients;
    return NextResponse.json({ array }, { status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for recipients: ${e}`, {
      status: 500,
    });
  }
}
