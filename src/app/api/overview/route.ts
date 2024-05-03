import { extractBody } from "@/utils/extractBody";
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";

export async function POST(req: NextRequest) {
  try {
    const body = await extractBody(req);
    const { id } = body;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const sqlStatement = sqlstring.format("select * from users where uid = ?", [
      id,
    ]);
    const done = await pool.query(sqlStatement);
    await pool.end();
    const returnArray = done.rows.map((row) => row);
    return NextResponse.json({ returnArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in overview: ${error}`, { status: 500 });
  }
}
export async function GET() {
  try {
    console.log("in get");
  } catch (error) {
    console.error("error in get", error);
  }
}
