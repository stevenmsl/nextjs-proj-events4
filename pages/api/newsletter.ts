import { NextApiRequest, NextApiResponse } from "next";
import {
  NewsletterRegistrationReq,
  NewsletterRegistrationModel,
} from "../../types";
import { insertRegistration } from "../../helpers/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body as NewsletterRegistrationReq;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email address." });
      return;
    }

    const result = await insertRegistration({ email });

    if (result.hasError) res.status(500).json({ message: result.message });
    else
      res
        .status(201)
        .json({ message: "you are registered!", doc: result.result });
  }
};

export default handler;
