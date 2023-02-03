import MovieForm from "@/modules/dashboard/movie-management/component/movie-form";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { MovieFieldType, MovieFieldValues } from "@/modules/dashboard/movie-management/constants/movie-field-values";
import { movieCreateAsync } from "@/modules/dashboard/movie-management/action";
import movieValidationSchema from "@/modules/dashboard/movie-management/utils/movie-validation-schema";

export default function MovieCreateContainer({ handleCloseModal, textFields }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const movieState = useAppSelector((x) => x.movie_management_reducer);
  const imageState = useAppSelector((x) => x.upload_image_reducer);

  const [wasCreated, setWasCreated] = useState(false);
  const handleSubmit = async (values: MovieFieldType) => {
    if (await movieValidationSchema.isValid(values)) {
      await dispatch(movieCreateAsync(values));
      setWasCreated(true);
    }
  };

  useEffect(() => {
    if (movieState?.loadingStatusCreate === LOADING_STATUSES.IDLE && wasCreated) {
      handleCloseModal();
    }
  }, [movieState?.loadingStatusCreate, handleCloseModal, wasCreated]);

  return (
    <MovieForm theme={theme} title="Create movie"
               initialValues={MovieFieldValues}
               handleSubmit={handleSubmit}
               handleCancel={handleCloseModal}
               movieState={movieState}
               imageState={imageState}
               textFields={textFields}
    />
  );
}