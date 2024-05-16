import { extractBody } from "@/utils/extractBody";
import { NextRequest, NextResponse } from "next/server";
import sqlstring from "sqlstring";
import { Pool } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const body = await extractBody(req);
    console.log(body);
    const { cid, amount, time_period } = body;
    const sqlStatement = sqlstring.format(
      "insert into budget (cid, amount, time_period) values (?, ?, ?)",
      [cid, amount, time_period]
    );
    await pool.query(sqlStatement);
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in adding budget: ${error}`, {
      status: 500,
    });
  }
}
