import { DummyEvent, DummyEventsRaw } from "../types";
import { toEvents } from "./util";

export const getAllEvents = async () => {
  const url = "https://nexjs-course-default-rtdb.firebaseio.com/events.json";

  const res = await fetch(url);
  const eventsRaw: DummyEventsRaw = await res.json();
  return toEvents(eventsRaw);
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string) => {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;
  const events = await getAllEvents();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
