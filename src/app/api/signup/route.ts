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
    const { username, user_password, email } = body;
    const sqlStatement = sqlstring.format(
      "insert into users (username, user_password, email) values (?, ?, ?)",
      [username, user_password, email]
    );
    const uidQuery = sqlstring.format(
      "select uid from users where username = ? AND user_password = ? AND email = ?",
      [username, user_password, email]
    );
    await pool.query(sqlStatement);
    const done = await pool.query(uidQuery);
    const uid = done.rows[0].uid;
    await pool.end();
    return NextResponse.json({ uid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in login route: ${error}`, { status: 500 });
  }
}
