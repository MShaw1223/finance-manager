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

    const { card_name, uid } = body;

    const sqlStatement = sqlstring.format(
      "insert into card (card_name, uid) values (?, ?)",
      [card_name, uid]
    );

    await pool.query(sqlStatement);
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in card submission: ${e}`, { status: 500 });
  }
}
