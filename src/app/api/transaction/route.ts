import { extractBody } from "@/utils/extractBody";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { transactionAmount, selectedCardId, value } = body;
    if (value.from === "") {
      const newTransaction = sql(
        "insert into transactions (amount, cid, recipient) values ($1, $2, $3)",
        [transactionAmount, selectedCardId, value.recipient]
      );
      await newTransaction;
    } else if (value.recipient === "") {
      const newTransaction = sql(
        "insert into transactions (amount, cid, transaction_from) values ($1, $2, $3)",
        [transactionAmount, selectedCardId, value.from]
      );
      await newTransaction;
    }

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(`Error in POST for new spend: ${e}`, {
      status: 500,
    });
  }
}
