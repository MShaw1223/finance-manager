import { Params } from "@/utils/interface";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const id = params.params.id;
    const cardDetails = sql("select cid, card_name from card where uid = $1", [
      id,
    ]);
    const array = await cardDetails;
    return NextResponse.json({ array }, { status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for card retrieval: ${e}`, {
      status: 500,
    });
  }
}
