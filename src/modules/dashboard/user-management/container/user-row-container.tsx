import { useTheme } from "@mui/material";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import UserRow from "@/modules/dashboard/user-management/component/user-row";
import {
  userChangeBlockStatusAsync,
  userDeleteAsync,
  userGetOneActionAsync,
} from "@/modules/dashboard/user-management/action";
import { UserRowContainerProps } from "@/modules/dashboard/user-management/types/user-row-props";
import { clearErrors } from "@/modules/dashboard/user-management/reducer";

export default function UserRowContainer({ user, index, handleOpenModal }: UserRowContainerProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleGetDetails = async () => {
    await dispatch(userGetOneActionAsync(user.id));
    handleOpenModal(ModalActionTypes.DETAILS);
  };

  const handleUpdate = async () => {
    await dispatch(userGetOneActionAsync(user.id));
    handleOpenModal(ModalActionTypes.UPDATE);
  };

  const handleRemove = async () => {
    await dispatch(userDeleteAsync(user.id));
  };

  const handleBlock = async () => {
    await dispatch(userChangeBlockStatusAsync(user.id));
  };

  const handleClearErrors = async () => {
    await dispatch(clearErrors());
  };

  return (
    <UserRow theme={theme} user={user} index={index} handleGetDetails={handleGetDetails} handleBlock={handleBlock}
             handleUpdate={handleUpdate} handleRemove={handleRemove} handleClearErrors={handleClearErrors} />
  );
}