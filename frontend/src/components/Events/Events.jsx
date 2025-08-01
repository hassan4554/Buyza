import { useSelector } from "react-redux";
import styles from "../../constants/styles";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}
            <h4 className="text-center font-semibold">{allEvents?.length === 0 && "Currently no events!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
