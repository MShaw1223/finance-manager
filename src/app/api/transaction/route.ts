import { extractBody } from "@/utils/extractBody";
import { Pool } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import sqlstring from "sqlstring";

// amount numeric
// cid int4
// recipient text
// tid int4
// transaction_datetime timestamp

export async function POST(req: NextRequest) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const body = await extractBody(req);
    const { transactionAmount, recipient, selectedCardId, from } = body;
    const newSpend = sqlstring.format(
      "insert into transactions (amount, cid, recipient, transaction_from) values (?, ?, ?, ?)",
      [transactionAmount, selectedCardId, recipient, from]
    );
    await pool.query(newSpend);
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for new spend: ${e}`, {
      status: 500,
    });
  }
}
