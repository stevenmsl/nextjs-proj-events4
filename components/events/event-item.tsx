import React from "react";
import Image from "next/image";
import { DummyEvent } from "../../types";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

/* #TA4-04
  image optimization
  - the size of images will reduce significantly ( 5 MB - > 10 K)
  - images are lazy-loaded; you don't see them on the page 
    Nextjs will not load them    
*/
import classes from "./event-item.module.css";

interface EventItemProps {
  event: DummyEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { title, image, date, location, id } = event;

  const eventDate = new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const address = location.replace(", ", "\n");
  const eventLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={250} height={160}></Image>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{eventDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={eventLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
