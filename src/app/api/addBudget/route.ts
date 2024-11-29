import { extractBody } from "@/utils/extractBody";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { cid, amount, time_period } = body;
    const sqlStatement = sql(
      "insert into budget (cid, amount, time_period) values ($1, $2, $3)",
      [cid, amount, time_period]
    );
    await sqlStatement;
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(`Error in adding budget: ${error}`, {
      status: 500,
    });
  }
}
