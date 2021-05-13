import { DummyEventsRaw, DummyEvent, DummyEventContent } from "../types";

export const toEvents = (eventsRaw: DummyEventsRaw): DummyEvent[] => {
  if (!eventsRaw) return null;
  const events: DummyEvent[] = [];
  /* Firebase will return you a big object not an array */
  for (const key in eventsRaw) {
    events.push({ id: key, ...eventsRaw[key] });
  }
  return events;
};
