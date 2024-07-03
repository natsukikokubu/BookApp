import { supabase } from "../../utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await supabase.from("books").select("*");

    res.status(200).json(data);
  } else if (req.method === "POST") {
    const { title, summary, comment } = req.body;

    await supabase.from("books").insert([
      {
        title,
        summary,
        comment,
      },
    ]);
    res.status(201).end();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
