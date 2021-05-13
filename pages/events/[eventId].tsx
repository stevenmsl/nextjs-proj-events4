import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment } from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { DummyEvent } from "../../types";

interface EventDetailPageProps {
  event: DummyEvent;
}

/* #TA3-01
   - Dynamic meta data using Head
*/

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics event={event}></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}></Comments>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async (
  context
) => {
  const eventId = context.params.eventId as string;
  const event = await getEventById(eventId);

  return {
    props: { event },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetailPage;
