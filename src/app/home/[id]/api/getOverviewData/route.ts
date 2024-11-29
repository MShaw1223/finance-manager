import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Params } from "@/utils/interface";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const sql = neon(process.env.DATABASE_URL!);
    const total_spend = sql(
      `
      WITH card_cid AS (
        SELECT cid FROM card WHERE uid = $1
      )
      SELECT
        (SELECT SUM(amount) FROM spend WHERE cid IN (SELECT cid FROM card_cid)) AS total_spend,
        (SELECT SUM(amount) FROM transactions WHERE transaction_from = 'me' AND cid IN (SELECT cid FROM card_cid)) AS total_out_transactions;
      `,
      [id]
    );
    const most_used_card = sql(
      `select card_name
      from card
      where cid = (
            SELECT cid
            FROM spend
            WHERE cid in (select cid from card where uid = $1)
            GROUP BY cid
            ORDER BY count(*) DESC
            LIMIT 1
        )`,
      [id]
    );
    const most_visited = sql(
      `
        select spend_location, COUNT(*) AS spend_count
        FROM spend
        WHERE cid in (select cid from card where uid = $1)
        GROUP BY spend_location
        ORDER BY spend_count DESC
        LIMIT 1
      `,
      [id]
    );
    const [ts_done, mu_done, mv_done] = await Promise.all([
      total_spend,
      most_used_card,
      most_visited,
    ]);
    return NextResponse.json(
      {
        stats: {
          running_spend: ts_done[0],
          most_used_card: mu_done[0],
          most_visited: mv_done[0],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(`Error in GET: ${error}`, { status: 500 });
  }
}
