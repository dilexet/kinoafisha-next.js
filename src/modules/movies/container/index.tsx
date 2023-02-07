import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SelectChangeEvent } from "@mui/material";
import MoviesComponent from "@/modules/movies/component";
import { MovieContainerProps } from "@/modules/movies/types/movie-props";



export default function MoviesContainer({ values, setFieldValue, handleBlur, errors, touched }: MovieContainerProps) {
  const moviesState = useAppSelector((x) => x.movies_reducer);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("movieId", event.target.value);
  };

  return (
    <MoviesComponent values={values} handleChange={handleChange} moviesState={moviesState}
                     handleBlur={handleBlur} errors={errors} touched={touched}
    />
  );
}