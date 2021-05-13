export type DummyEvent = DummyEventContent & {
  id: string;
};

export type DummyEventContent = {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type DummyEventsRaw = {
  [key: string]: DummyEventContent;
};

export interface NewsletterRegistrationReq {
  email: string;
}

export interface NewsletterRegistrationModel {
  email: string;
}

export interface CommentReq {
  email: string;
  name: string;
  text: string;
}

export interface CommentModel {
  email: string;
  name: string;
  text: string;
  eventId: string;
}

export interface CommentRes {
  id: string;
  email: string;
  name: string;
  text: string;
}
