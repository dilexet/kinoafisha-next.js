import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import CinemaDetailsContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-details-container";
import CinemaCreateContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-create-container";
import CinemaUpdateContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-update-container";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export default function CinemaModalContainer({ modalType, handleCloseModal }) {
  const cinemaState = useAppSelector(x => x.cinema_management_reducer);

  if (cinemaState?.loadingStatusGetOne === LOADING_STATUSES.LOADING) {
    return <Loading />;
  }

  if (modalType === ModalActionTypes.DETAILS) {
    return <CinemaDetailsContainer />;
  }

  if (modalType === ModalActionTypes.UPDATE) {
    return <CinemaUpdateContainer handleCloseModal={handleCloseModal} />;
  }

  if (modalType === ModalActionTypes.CREATE) {
    return <CinemaCreateContainer handleCloseModal={handleCloseModal} />;
  }
}
