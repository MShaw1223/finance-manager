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
    const { recipient_name, uid } = body;
    const sqlStatement = sqlstring.format(
      "insert into recipient (recipient_name, uid) values (?, ?)",
      [recipient_name, uid]
    );
    await pool.query(sqlStatement);
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in recipient submission: ${e}`, {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const body = await extractBody(req);
    const { favourite, rid } = body;
    const sqlStatement = sqlstring.format(
      "UPDATE recipient SET favourite = ? WHERE rid = ?",
      [favourite, rid]
    );
    await pool.query(sqlStatement);
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in recipient submission: ${e}`, {
      status: 500,
    });
  }
}
