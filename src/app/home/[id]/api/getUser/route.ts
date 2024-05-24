import { NextRequest, NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";
import { Params } from "@/utils/interface";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const sqlStatement = sqlstring.format(
      "select uid,username,email from users where uid = ?",
      [id]
    );

    const done = await pool.query(sqlStatement);

    await pool.end();
    const array = done.rows;
    return NextResponse.json({ array }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in GET: ${error}`, { status: 500 });
  }
}
