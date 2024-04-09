import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // to add other filtering options  add the above object and other others with different fields and values and then  on the apiBookings. map them into and the query string to them
  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // after initilizaing- set what is to be fetched
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // the second param acts as a dependency, reloading the data wheneverit chnanges
    // the combinations of differnet inputs recorded here will also have their data checked- when does it go stale??
    queryKey: ["bookings", filter, sortBy, page],
    //calling a query function with inputs- just calling a function which explicitly returns data
    queryFn: () => getBookings({ filter, sortBy, page }),
  }); // data here   is state

  //PREFETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],

      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],

      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count };
}
