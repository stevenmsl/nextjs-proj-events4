import { NextApiRequest, NextApiResponse } from "next";
import { CommentReq, CommentRes, CommentModel } from "../../../types";

import { getComments, insertComment } from "../../../helpers/db";

/* #TA4-02 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId as string;

  if (req.method === "POST") {
    const { email, name, text } = req.body as CommentReq;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const comment: CommentModel = { eventId, ...(req.body as CommentReq) };

    /* #TA4-03 */
    const result = await insertComment(comment);

    if (result.hasError) {
      res.status(500).json({ message: result.message });
    } else {
      res.status(201).json({ message: "comment added", doc: result.result });
    }
  }

  if (req.method === "GET") {
    const result = await getComments(eventId);
    const comments: CommentRes[] = result.result.map((doc) => ({
      id: doc._id.toHexString(),
      name: doc.name,
      email: doc.email,
      text: doc.text,
    }));

    if (result.hasError)
      res.status(500).json({ message: "Unable to load comments" });
    else res.status(200).json(comments);
  }
};

export default handler;
