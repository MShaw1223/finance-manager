import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function extractBody(
  req: NextRequest | NextApiRequest | Response
) {
  try {
    if (!req.body) {
      return null;
    }

    const decoder = new TextDecoder();

    const reader = req.body.getReader();

    let body = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        try {
          return JSON.parse(body);
        } catch (e) {
          console.error(e);
          return null;
        }
      }
      body = body + decoder.decode(value);
    }
  } catch (error) {
    console.error("Error extracting body:", error);
  }
}
