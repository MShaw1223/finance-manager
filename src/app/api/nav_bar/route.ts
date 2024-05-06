import { extractBody } from "@/utils/extractBody";
import { Pool } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import sqlstring from "sqlstring";

export async function POST(req: NextRequest) {
  try {
    const body = await extractBody(req);
    const { id } = body;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const sqlStatement = sqlstring.format(
      "select username from users where uid = ?",
      [id]
    );
    const done = await pool.query(sqlStatement);
    await pool.end();
    const user = done.rows[0].username;
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in overview: ${error}`, { status: 500 });
  }
}
