import MovieForm from "@/modules/dashboard/movie-management/component/movie-form";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { MovieFieldType } from "@/modules/dashboard/movie-management/constants/movie-field-values";
import { movieUpdateAsync } from "@/modules/dashboard/movie-management/action";
import movieValidationSchema from "@/modules/dashboard/movie-management/utils/movie-validation-schema";
import moment from "moment/moment";

export default function MovieUpdateContainer({ handleCloseModal, textFields }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const movieState = useAppSelector((x) => x.movie_management_reducer);
  const imageState = useAppSelector((x) => x.upload_image_reducer);

  const [initialValues, setInitialValues] = useState<MovieFieldType>(null);
  const [wasUpdated, setWasUpdated] = useState(false);

  const handleSubmit = async (values: MovieFieldType) => {
    if (await movieValidationSchema.isValid(values)) {
      await dispatch(movieUpdateAsync({ values: values, id: values.id }));
      setWasUpdated(true);
    }
  };

  useEffect(() => {
    if (movieState?.loadingStatusUpdate === LOADING_STATUSES.IDLE && wasUpdated) {
      handleCloseModal();
    }
  }, [movieState?.loadingStatusUpdate, handleCloseModal, wasUpdated]);

  useEffect(() => {
    if (!initialValues && movieState?.loadingStatusGetOne === LOADING_STATUSES.IDLE) {
      setInitialValues({
        id: movieState?.movie?.id,
        name: movieState?.movie?.name,
        posterURL: movieState?.movie?.posterURL,
        description: movieState?.movie?.description,
        premiereDate: moment(movieState?.movie?.premiereDate).format("YYYY-MM-DD"),
        durationInMinutes: movieState?.movie?.durationInMinutes,
        genres: movieState?.movie?.genres.map(x => x.id),
        countries: movieState?.movie?.countries?.map(x => x.name),
      });
    }
  }, [initialValues, movieState?.loadingStatusGetOne, movieState?.movie?.countries, movieState?.movie?.description, movieState?.movie?.durationInMinutes, movieState?.movie?.genres, movieState?.movie?.id, movieState?.movie?.name, movieState?.movie?.posterURL, movieState?.movie?.premiereDate]);


  return (
    <MovieForm theme={theme} title="Update movie"
               initialValues={initialValues}
               handleSubmit={handleSubmit}
               handleCancel={handleCloseModal}
               movieState={movieState}
               imageState={imageState}
               textFields={textFields}
    />
  );
}