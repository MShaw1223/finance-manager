import { extractBody } from "@/utils/extractBody";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);

    const { card_name, uid } = body;

    const sqlStatement = sql(
      "insert into card (card_name, uid) values ($1, $2)",
      [card_name, uid]
    );

    await sqlStatement;
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in card submission: ${e}`, { status: 500 });
  }
}
