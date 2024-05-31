import { extractBody } from "@/utils/extractBody";
import { NextRequest, NextResponse } from "next/server";
import sqlstring from "sqlstring";
import { Pool, QueryResult } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const body = await extractBody(req);
    const { username, user_password, email }: { [key: string]: string } = body;
    const checkQuery = sqlstring.format(
      "select count(*) as checker from users where username = ? and user_password = ? and email = ?",
      [username, user_password, email]
    );
    const check = await pool.query(checkQuery);
    if (parseInt(check.rows[0].checker) > 0) {
      return NextResponse.json("User already exists", { status: 403 });
    } else {
      const sqlStatement = sqlstring.format(
        "insert into users (username, user_password, email) values (?, ?, ?) returning uid",
        [username, user_password, email]
      );
      const newUser: QueryResult<{ uid: number }> = await pool.query(
        sqlStatement
      );
      const uid = newUser.rows[0].uid;
      await pool.end();
      return NextResponse.json({ uid }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(`Error in login route: ${error}`, { status: 500 });
  }
}
