import { ObjectId } from "mongodb";
import { CommentModel, NewsletterRegistrationModel } from "../types";
import { MongoClient } from "mongodb";
export const mongdbUrl =
  "mongodb+srv://dbTraining:q4EkkkKnrbJQCiMb@cluster0.t0rrt.mongodb.net/events?retryWrites=true&w=majority";

/* #TA4-04 */
export interface CommentModelRaw extends CommentModel {
  _id?: ObjectId;
}

export interface NewsletterRegistrationModelRaw
  extends NewsletterRegistrationModel {
  _id?: ObjectId;
}

export interface DbResult<T> {
  result: T;
  hasError: boolean;
  message: string;
}

export const connect = async () => {
  const result: DbResult<MongoClient> = {
    result: null,
    hasError: false,
    message: "",
  };

  try {
    result.result = await MongoClient.connect(mongdbUrl, {
      useUnifiedTopology: true,
    });
  } catch (error) {
    result.hasError = true;
    result.message = "unable to connect to the db";
  }
  return result;
};

export const insertRegistration = async (
  registration: NewsletterRegistrationModel
) => {
  const registrationRaw: NewsletterRegistrationModelRaw = { ...registration };
  const result: DbResult<NewsletterRegistrationModelRaw> = {
    result: registrationRaw,
    hasError: false,
    message: "",
  };

  const connectDb = await connect();

  if (connectDb.hasError) {
    result.hasError = true;
    result.message = connectDb.message;
    return result;
  }

  try {
    const db = connectDb.result.db();
    const inserted = await db
      .collection<NewsletterRegistrationModel>("newsletter")
      .insertOne(registration);
    registrationRaw._id = inserted.insertedId;
  } catch (error) {
    result.hasError = true;
    result.message = "failed to insert registration";
  }

  connectDb.result.close();

  return result;
};

export const insertComment = async (comment: CommentModel) => {
  const commentRaw: CommentModelRaw = { ...comment };
  const result: DbResult<CommentModelRaw> = {
    result: commentRaw,
    hasError: false,
    message: "",
  };

  const connectDb = await connect();

  if (connectDb.hasError) {
    result.hasError = true;
    result.message = connectDb.message;
    return result;
  }

  try {
    const db = connectDb.result.db();
    const inserted = await db
      .collection<NewsletterRegistrationModel>("comments")
      .insertOne(comment);
    commentRaw._id = inserted.insertedId;
  } catch (error) {
    result.hasError = true;
    result.message = "failed to insert comment";
  }

  connectDb.result.close();

  return result;
};

export const getComments = async (eventId: string) => {
  const result: DbResult<CommentModelRaw[]> = {
    result: [],
    hasError: false,
    message: "",
  };

  const connectDb = await connect();

  if (connectDb.hasError) {
    result.hasError = true;
    result.message = connectDb.message;
    return result;
  }

  try {
    const db = connectDb.result.db();

    result.result = await db
      .collection<CommentModelRaw>("comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 }) //descending
      .toArray();
  } catch (error) {
    result.hasError = true;
    result.message = "failed to load comments";
  }

  connectDb.result.close();

  return result;
};
