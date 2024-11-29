import { extractBody } from "@/utils/extractBody";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { location, amount, cid } = body;
    const sqlStatement = sql(
      "insert into spend (amount, cid, spend_location) values ($1, $2, $3)",
      [amount, cid, location]
    );
    await sqlStatement;
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for new spend: ${e}`, {
      status: 500,
    });
  }
}
