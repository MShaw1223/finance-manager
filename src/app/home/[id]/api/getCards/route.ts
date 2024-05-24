import { extractBody } from "@/utils/extractBody";
import { Params } from "@/utils/interface";
import { Pool } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import sqlstring from "sqlstring";

export async function GET(req: NextRequest, params: Params) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const id = params.params.id;
    const cardDetails = sqlstring.format(
      "select cid, card_name from card where uid = ?",
      [id]
    );
    const done = await pool.query(cardDetails);
    const array = done.rows;
    return NextResponse.json({ array }, { status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for card retrieval: ${e}`, {
      status: 500,
    });
  }
}
