import { extractBody } from "@/utils/extractBody";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await extractBody(req);
    const { username, user_password, email }: { [key: string]: string } = body;
    const checkQuery = sql(
      "select count(*) as checker from users where username = $1 and user_password = $2 and email = $3",
      [username, user_password, email]
    );
    const check = await checkQuery;
    if (parseInt(check[0].checker) > 0) {
      return NextResponse.json("User already exists", { status: 403 });
    } else {
      const sqlStatement = sql(
        "insert into users (username, user_password, email) values ($1, $2, $3) returning uid",
        [username, user_password, email]
      );
      const newUser = await sqlStatement;
      const uid = newUser[0].uid;
      return NextResponse.json({ uid }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(`Error in login route: ${error}`, { status: 500 });
  }
}
