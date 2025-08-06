import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" bg-[var(--color-background)]">
          <Header activeHeading={4} />
          {allEvents.length ? (
            <EventCard active={true} data={allEvents[0]} />
          ) : (
            <div className="text-4xl font-semibold flex items-center justify-center mx-auto text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Currently no events!
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
