import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import SessionCreateContainer from "@/modules/dashboard/session-management/container/modal/session-create-container";
import { moviesGetAllAsync } from "@/modules/movies/action";
import { cinemasGetAllAsync } from "@/modules/cinemas/action";
import SessionUpdateContainer from "@/modules/dashboard/session-management/container/modal/session-update-container";
import SessionDetailsContainer from "@/modules/dashboard/session-management/container/modal/session-details-container";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import Loading from "@/modules/loading";

export default function SessionModalContainer({ modalType, handleCloseModal }) {
  const dispatch = useAppDispatch();
  const sessionState = useAppSelector((x) => x.session_management_reducer);
  const [loadData, setLoadData] = useState(true);

  const fetchData = useCallback(async () => {
    await dispatch(moviesGetAllAsync());
    await dispatch(cinemasGetAllAsync());
  }, [dispatch]);

  useEffect(() => {
    if (loadData === true && modalType !== ModalActionTypes.DETAILS) {
      fetchData().catch(console.error);
      setLoadData(false);
    } else {
      setLoadData(false);
    }
  }, [fetchData, loadData, modalType]);

  if (
    loadData ||
    sessionState?.loadingStatusGetOne === LOADING_STATUSES.LOADING
  ) {
    return <Loading />;
  }

  if (modalType === ModalActionTypes.DETAILS) {
    return <SessionDetailsContainer />;
  }

  if (modalType === ModalActionTypes.CREATE) {
    return (
      <SessionCreateContainer
        handleCloseModal={handleCloseModal}
        modalType={modalType}
      />
    );
  }

  if (modalType === ModalActionTypes.UPDATE) {
    return (
      <SessionUpdateContainer
        handleCloseModal={handleCloseModal}
        modalType={modalType}
      />
    );
  }
}
