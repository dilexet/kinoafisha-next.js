import { useTheme } from "@mui/material";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { movieDeleteAsync, movieGetOneActionAsync } from "@/modules/dashboard/movie-management/action";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { MovieRowContainerProps } from "@/modules/dashboard/movie-management/types/movie-row-props";
import MovieRow from "@/modules/dashboard/movie-management/component/movie-row";

export default function MovieRowContainer({ movie, index, handleOpenModal }: MovieRowContainerProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleGetDetails = async () => {
    await dispatch(movieGetOneActionAsync(movie.id));
    handleOpenModal(ModalActionTypes.DETAILS);
  };

  const handleUpdate = async () => {
    await dispatch(movieGetOneActionAsync(movie.id));
    handleOpenModal(ModalActionTypes.UPDATE);
  };

  const handleRemove = async () => {
    await dispatch(movieDeleteAsync(movie.id));
  };

  return (
    <MovieRow theme={theme} movie={movie} index={index} handleGetDetails={handleGetDetails}
               handleUpdate={handleUpdate} handleRemove={handleRemove}/>
  );
}