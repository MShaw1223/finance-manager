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
    const { transactionAmount, selectedCardId, value } = body;
    if (value.from === "") {
      const newTransaction = sqlstring.format(
        "insert into transactions (amount, cid, recipient) values (?, ?, ?)",
        [transactionAmount, selectedCardId, value.recipient]
      );
      await pool.query(newTransaction);
    } else if (value.recipient === "") {
      const newTransaction = sqlstring.format(
        "insert into transactions (amount, cid, transaction_from) values (?, ?, ?)",
        [transactionAmount, selectedCardId, value.from]
      );
      await pool.query(newTransaction);
    }
    await pool.end();
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for new spend: ${e}`, {
      status: 500,
    });
  }
}
