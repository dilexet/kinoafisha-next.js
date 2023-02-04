import CinemaRow from "@/modules/dashboard/cinema-management/component/cinema-row";
import { useTheme } from "@mui/material";
import { CinemaRowContainerProps } from "@/modules/dashboard/cinema-management/types/cinema-row-props";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { cinemaDeleteAsync, cinemaGetOneActionAsync } from "@/modules/dashboard/cinema-management/action";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { clearErrors } from "@/modules/dashboard/cinema-management/reducer";

export default function CinemaRowContainer({ cinema, index, handleOpenModal }: CinemaRowContainerProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleGetDetails = async () => {
    await dispatch(cinemaGetOneActionAsync(cinema.id));
    handleOpenModal(ModalActionTypes.DETAILS);
  };

  const handleUpdate = async () => {
    await dispatch(cinemaGetOneActionAsync(cinema.id));
    handleOpenModal(ModalActionTypes.UPDATE);
  };

  const handleRemove = async () => {
    await dispatch(cinemaDeleteAsync(cinema.id));
  };

  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  return (
    <CinemaRow theme={theme} cinema={cinema} index={index} handleGetDetails={handleGetDetails}
               handleUpdate={handleUpdate} handleRemove={handleRemove} handleClearErrors={handleClearErrors}/>
  );
}