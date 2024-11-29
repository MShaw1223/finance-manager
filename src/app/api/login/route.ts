import { extractBody } from "@/utils/extractBody";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { username, user_password } = body;
    const sqlStatement = sql(
      "select uid from users where username = $1 AND user_password = $2",
      [username, user_password]
    );
    const done = await sqlStatement;
    const uid = done[0].uid;
    return NextResponse.json({ uid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in login route: ${error}`, { status: 500 });
  }
}
