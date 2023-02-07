import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import CinemaDetailsContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-details-container";
import CinemaCreateContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-create-container";
import CinemaUpdateContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-update-container";

export default function CinemaModalContainer({ modalType, handleCloseModal }) {
  if (modalType === ModalActionTypes.DETAILS) {
    return <CinemaDetailsContainer />;
  } else {
    if (modalType === ModalActionTypes.UPDATE) {
      return <CinemaUpdateContainer handleCloseModal={handleCloseModal} />;
    }

    if (modalType === ModalActionTypes.CREATE) {
      return <CinemaCreateContainer handleCloseModal={handleCloseModal} />;
    }
  }
}
