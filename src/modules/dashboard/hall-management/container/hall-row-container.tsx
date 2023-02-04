import { HallRowContainerProps } from "@/modules/dashboard/hall-management/types/hall-row-props";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { hallDeleteAsync, hallGetOneActionAsync } from "@/modules/dashboard/hall-management/action";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { clearErrors } from "@/modules/dashboard/hall-management/reducer";
import HallRow from "@/modules/dashboard/hall-management/component/hall-row";

export default function HallRowContainer({ hall, index, handleOpenModal }: HallRowContainerProps) {
  const dispatch = useAppDispatch();

  const handleGetDetails = async () => {
    await dispatch(hallGetOneActionAsync(hall.id));
    handleOpenModal(ModalActionTypes.DETAILS);
  };

  const handleUpdate = async () => {
    await dispatch(hallGetOneActionAsync(hall.id));
    handleOpenModal(ModalActionTypes.UPDATE);
  };

  const handleRemove = async () => {
    await dispatch(hallDeleteAsync(hall.id));
  };

  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  return (
    <HallRow hall={hall} index={index} handleGetDetails={handleGetDetails}
             handleUpdate={handleUpdate} handleRemove={handleRemove}
             handleClearErrors={handleClearErrors} />
  );
}