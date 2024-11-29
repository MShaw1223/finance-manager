import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Params } from "@/utils/interface";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const sql = neon(process.env.DATABASE_URL!);
    const sqlStatement = sql(
      "select uid, username, email from users where uid = $1",
      [id]
    );

    const array = await sqlStatement;
    return NextResponse.json({ array }, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in GET: ${error}`, { status: 500 });
  }
}
