import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { constrainedMemory } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const supabaseRes = await supabase

      .from("books")
      .select("*")
      .eq("id", req.query.id);

    if (Array.isArray(supabaseRes.data)) {
      res.status(200).json({ data: supabaseRes.data[0] });
      console.log(supabaseRes.data[0]);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } else if (req.method === "PUT") {
    const { title, summary, comment } = req.body;

    await supabase
      .from("books")
      .update({
        title,
        summary,
        comment,
      })
      .eq("id", req.query.id);

    res.status(200).json({ message: "Updated" });
  } else {
    res.status(405).json({ message: "Not Found" });
  }
}
