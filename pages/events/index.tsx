import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { DummyEvent } from "../../types";
import { GetStaticProps } from "next";
import Head from "next/head";

interface AllEventPageProps {
  events: DummyEvent[];
}

const AllEventsPage: React.FC<AllEventPageProps> = ({ events }) => {
  const router = useRouter();

  const findEvents = (year: string, month: string) => {
    /*
      - you need to have at least two parameters to
        reach the catch-all page [...slug].tsx
        - events/2021/12
      - it will reach the [eventId].tsx page if you
        only have one parameter
        - events/2021    
    */
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="All Events"></meta>
      </Head>
      <EventSearch onSearch={findEvents} />
      <EventList events={events}></EventList>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<AllEventPageProps> = async () => {
  const events = await getAllEvents();
  return {
    props: { events },
    revalidate: 60,
  };
};

export default AllEventsPage;
