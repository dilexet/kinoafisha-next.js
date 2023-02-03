import { useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import MovieDetails from "@/modules/dashboard/movie-management/component/movie-details";
import moment from "moment";
import { convertMinutesToHoursWithMinutes } from "@/modules/dashboard/movie-management/utils/date-formater";

export default function MovieDetailsContainer() {
  const movieState = useAppSelector((x) => x.movie_management_reducer);

  const [gridItems, setGridItems] = useState<GridItemsType[]>(null);

  useEffect(() => {
    if (!gridItems && movieState?.loadingStatusGetOne === LOADING_STATUSES.IDLE) {
      const newGridItems = [
        {
          property: "Name",
          value: movieState?.movie?.name,
        },
        {
          property: "Description",
          value: movieState?.movie?.description,
        },
        {
          property: "Premier date",
          value: moment(movieState?.movie?.premiereDate).format("D MMMM YYYY"),
        },
        {
          property: "Duration",
          value: `${movieState.movie.durationInMinutes}m = ${convertMinutesToHoursWithMinutes(movieState.movie.durationInMinutes)}`,
        },
      ];
      setGridItems(newGridItems);
    }
  }, [gridItems, movieState?.loadingStatusGetOne, movieState.movie?.description, movieState.movie.durationInMinutes, movieState.movie?.name, movieState.movie?.premiereDate]);


  return (
    <MovieDetails gridItems={gridItems} movieState={movieState} />
  );
}