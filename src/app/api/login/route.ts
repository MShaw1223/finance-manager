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
    const { username, user_password } = body;
    const sqlStatement = sqlstring.format(
      "select uid from users where username = ? AND user_password = ?",
      [username, user_password]
    );
    const done = await pool.query(sqlStatement);
    await pool.end();
    const uid = done.rows[0].uid;
    return NextResponse.json({ uid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in login route: ${error}`, { status: 500 });
  }
}
