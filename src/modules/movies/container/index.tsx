import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SelectChangeEvent } from "@mui/material";
import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import MoviesComponent from "@/modules/movies/component";

export interface MovieContainerProps {
  values: SessionFieldsType;
  setFieldValue: any;
  touched: any;
  errors: any;
  handleBlur: any;
}

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