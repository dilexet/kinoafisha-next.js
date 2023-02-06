import { SessionRowContainerProps } from "@/modules/dashboard/session-management/types/session-row";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { sessionDeleteAsync, sessionGetOneActionAsync } from "@/modules/dashboard/session-management/action";
import { clearErrors } from "@/modules/dashboard/session-management/reducer";
import SessionRow from "@/modules/dashboard/session-management/component/session-row";

export default function SessionRowContainer({ session, index, handleOpenModal }: SessionRowContainerProps) {
  const dispatch = useAppDispatch();

  const handleGetDetails = async () => {
    await dispatch(sessionGetOneActionAsync(session.id));
    handleOpenModal(ModalActionTypes.DETAILS);
  };

  const handleUpdate = async () => {
    await dispatch(sessionGetOneActionAsync(session.id));
    handleOpenModal(ModalActionTypes.UPDATE);
  };

  const handleRemove = async () => {
    await dispatch(sessionDeleteAsync(session.id));
  };

  const handleClearErrors = async () => {
    await dispatch(clearErrors());
  };

  return (
    <SessionRow session={session} index={index} handleGetDetails={handleGetDetails}
                handleUpdate={handleUpdate} handleRemove={handleRemove}
                handleClearErrors={handleClearErrors} />
  );
}