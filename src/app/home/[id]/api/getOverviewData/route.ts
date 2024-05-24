import { NextRequest, NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";
import { Params } from "@/utils/interface";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const total_spend = sqlstring.format(
      `
      WITH card_cid AS (
        SELECT cid FROM card WHERE uid = ?
      )
      SELECT
        (SELECT SUM(amount) FROM spend WHERE cid IN (SELECT cid FROM card_cid)) AS total_spend,
        (SELECT SUM(amount) FROM transactions WHERE transaction_from = 'me' AND cid IN (SELECT cid FROM card_cid)) AS total_out_transactions;
      `,
      [id]
    );
    const most_used_card = sqlstring.format(
      `select card_name
      from card
      where cid = (
            SELECT cid
            FROM spend
            WHERE cid in (select cid from card where uid = ?)
            GROUP BY cid
            ORDER BY count(*) DESC
            LIMIT 1
        )`,
      [id]
    );
    const most_visited = sqlstring.format(
      `
        select spend_location, COUNT(*) AS spend_count
        FROM spend
        WHERE cid in (select cid from card where uid = ?)
        GROUP BY spend_location
        ORDER BY spend_count DESC
        LIMIT 1
      `,
      [id]
    );
    const [ts_done, mu_done, mv_done] = await Promise.all([
      pool.query(total_spend),
      pool.query(most_used_card),
      pool.query(most_visited),
    ]);
    // const ts_done = await pool.query(total_spend);
    // const ot_done = await pool.query(out_transactions);
    // const mu_done = await pool.query(most_used_card);
    // const mv_done = await pool.query(most_visited);

    await pool.end();
    return NextResponse.json(
      {
        stats: {
          running_spend: ts_done.rows[0],
          most_used_card: mu_done.rows[0],
          most_visited: mv_done.rows[0],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(`Error in GET: ${error}`, { status: 500 });
  }
}
