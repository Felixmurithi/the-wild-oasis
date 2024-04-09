import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  // after initilizaing- set what is to be fetched
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // check theuse of the dependency here-
    queryFn: () => getBooking(bookingId),
    retry: false, // react query tries to fetch data 3 times u can stop taht this waay
  }); // data here   is state

  return { isLoading, error, booking };
}
