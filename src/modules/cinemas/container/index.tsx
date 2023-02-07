import CinemasComponent from "@/modules/cinemas/component";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SelectChangeEvent } from "@mui/material";
import { CinemaContainerProps } from "@/modules/cinemas/types/cinemas-props";

export default function CinemasContainer({ values, setFieldValue, touched, handleBlur, errors }: CinemaContainerProps) {
  const cinemasState = useAppSelector((x) => x.cinemas_reducer);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("cinemaId", event.target.value);
  };

  return (
    <CinemasComponent values={values} handleChange={handleChange} cinemasState={cinemasState}
                      errors={errors} touched={touched}
                      handleBlur={handleBlur}
    />
  );
}