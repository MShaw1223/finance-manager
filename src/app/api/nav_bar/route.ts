import { extractBody } from "@/utils/extractBody";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await extractBody(req);
    const { id } = body;
    if (id) {
      const sql = neon(process.env.DATABASE_URL!);
      const sqlStatement = sql("select username from users where uid = $1", [
        id,
      ]);
      const done = await sqlStatement;
      const user = done[0].username;
      return NextResponse.json({ user }, { status: 200 });
    } else if (id === undefined) {
      const user = "";
      return NextResponse.json({ user }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(`Error in overview: ${error}`, { status: 500 });
  }
}
