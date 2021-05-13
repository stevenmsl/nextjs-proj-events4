import React from "react";
import { DummyEvent } from "../../types";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

interface EventListProps {
  events: DummyEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
