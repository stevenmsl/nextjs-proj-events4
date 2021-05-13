import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { GetServerSideProps } from "next";
import { DummyEvent } from "../../types";
import Head from "next/head";

type FilteredEventPageProps =
  | {
      events: DummyEvent[];
      date: { year: number; month: number };
    }
  | { hasError: boolean };

const FilteredEventPage: React.FC<FilteredEventPageProps> = (props) => {
  // type guard
  if ("hasError" in props) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>invalid year or month</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  } else {
    const { events, date } = props;
    if (!events || events.length === 0) {
      return (
        <Fragment>
          <ErrorAlert>
            <p>No events found for the year and month specified</p>
          </ErrorAlert>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Head>
          <title>Events - Filtered</title>
          <meta
            name="description"
            content={`Events in ${date.month}/${date.year}`}
          />
        </Head>
        <ResultsTitle date={new Date(date.year, date.month - 1)} />
        <EventList events={events}></EventList>
      </Fragment>
    );
  }
};

export const getServerSideProps: GetServerSideProps<FilteredEventPageProps> =
  async (context) => {
    const { params } = context;

    const filterData = params.slug;
    const year = +filterData[0];
    const month = +filterData[1];

    if (
      isNaN(year) ||
      isNaN(month) ||
      year > 2022 ||
      year < 2021 ||
      month < 1 ||
      month > 12
    ) {
      return {
        props: { hasError: true },
      };
    }

    const events = await getFilteredEvents({ year, month });

    return {
      props: { events, date: { year, month } },
    };
  };

export default FilteredEventPage;
