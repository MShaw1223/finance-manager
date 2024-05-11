import { extractBody } from "@/utils/extractBody";
import { Pool } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import sqlstring from "sqlstring";

export async function POST(req: NextRequest) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const body = await extractBody(req);
    const id = body;
    const cardDetails = sqlstring.format(
      "select cid, card_name from card where uid = ?",
      [id]
    );
    const done = await pool.query(cardDetails);
    const cardArray = done.rows.map((row) => row);
    return NextResponse.json({ cardArray }, { status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for card retrieval: ${e}`, {
      status: 500,
    });
  }
}
