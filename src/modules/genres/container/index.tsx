import GenresComponent from "@/modules/genres/component";
import { SelectChangeEvent } from "@mui/material";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { useEffect, useState } from "react";
import { GenreType } from "@/modules/dashboard/movie-management/types/movie-type";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { GenresContainerProps } from "@/modules/genres/types/genre-props";

export default function GenresContainer({
  values,
  setFieldValue,
}: GenresContainerProps) {
  const genresState = useAppSelector((x) => x.genres_reducer);
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
  const [hasValues, setHasValues] = useState(true);

  const handleChange = (event: SelectChangeEvent<GenreType[]>) => {
    const value: GenreType[] | string = event.target.value;
    if (typeof value !== "string") {
      setSelectedGenres(value);
      setFieldValue(
        "genres",
        value?.map((item) => item.id),
      );
    }
  };

  useEffect(() => {
    if (values.genres.length <= 0 && hasValues) {
      setHasValues(false);
    }
    if (
      genresState?.loadingStatus === LOADING_STATUSES.IDLE &&
      hasValues &&
      values.genres.length > 0
    ) {
      const initialValues = genresState?.genres?.filter((el) =>
        values.genres.includes(el.id),
      );
      setSelectedGenres(initialValues);
    }
  }, [
    genresState?.genres,
    genresState?.loadingStatus,
    hasValues,
    values.genres,
  ]);

  return (
    <GenresComponent
      values={values}
      selectedGenres={selectedGenres}
      genresState={genresState}
      handleChange={handleChange}
    />
  );
}
