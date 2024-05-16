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
    const { location, amount, cid } = body;
    const newSpend = sqlstring.format(
      "insert into spend (amount, cid, spend_location) values (?, ?, ?)",
      [amount, cid, location]
    );
    await pool.query(newSpend);
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for new spend: ${e}`, {
      status: 500,
    });
  }
}
