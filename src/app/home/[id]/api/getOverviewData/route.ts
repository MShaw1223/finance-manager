import { NextRequest, NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";
import sqlstring from "sqlstring";
import { Params } from "@/utils/types";

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const id = params.id;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const running_spend = sqlstring.format(
      "select sum(amount) as running_spend from spend where cid in (select cid from card where uid = ?)",
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
    const rs_done = await pool.query(running_spend);
    const mu_done = await pool.query(most_used_card);
    const mv_done = await pool.query(most_visited);
    await pool.end();
    return NextResponse.json(
      {
        stats: {
          running_spend: rs_done.rows[0],
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
