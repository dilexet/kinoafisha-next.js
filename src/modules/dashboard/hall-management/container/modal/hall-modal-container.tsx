import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import HallDetailsContainer from "@/modules/dashboard/hall-management/container/modal/hall-details-container";
import HallCreateContainer from "@/modules/dashboard/hall-management/container/modal/hall-create-container";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { cinemasGetAllAsync } from "@/modules/cinemas/action";
import { seatTypesGetAllAsync } from "@/modules/seat-types/action";
import HallUpdateContainer from "@/modules/dashboard/hall-management/container/modal/hall-update-container";

export default function HallModalContainer({ modalType, handleCloseModal }) {
  const dispatch = useAppDispatch();
  const [loadData, setLoadData] = useState(true);

  const fetchData = useCallback(
    async () => {
      await dispatch(cinemasGetAllAsync());
      await dispatch(seatTypesGetAllAsync());
    },
    [dispatch],
  );

  useEffect(() => {
    if (loadData === true && modalType !== ModalActionTypes.DETAILS) {
      fetchData().catch(console.error);
      setLoadData(false);
    } else {
      setLoadData(false);
    }
  }, [fetchData, loadData, modalType]);

  //TODO: skeleton
  if (loadData) {
    return <div></div>;
  }

  if (modalType === ModalActionTypes.DETAILS) {
    return (
      <HallDetailsContainer />
    );
  }

  if (modalType === ModalActionTypes.CREATE) {
    return (
      <HallCreateContainer handleCloseModal={handleCloseModal} />
    );
  }
  if (modalType === ModalActionTypes.UPDATE) {
    return (
      <HallUpdateContainer handleCloseModal={handleCloseModal} />
    );
  }
}