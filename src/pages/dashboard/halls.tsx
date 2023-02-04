import { DashboardPageLayout } from "@/pages/dashboard/index";
import Head from "next/head";
import TableManagementContainer from "@/modules/dashboard/shared/component/table-management-container";
import Modal from "@/modules/dashboard/shared/component/modal";
import HallTableBody from "@/modules/dashboard/hall-management/component/hall-table-body";
import HallTableHead from "@/modules/dashboard/hall-management/component/hall-table-head";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { clearErrors, selectAll } from "@/modules/dashboard/hall-management/reducer";
import { hallGetAllActionAsync } from "@/modules/dashboard/hall-management/action";
import HallModalContainer from "@/modules/dashboard/hall-management/container/modal/hall-modal-container";

function Halls() {
  const dispatch = useAppDispatch();
  const halls = useAppSelector(selectAll);
  const hallState = useAppSelector((x) => x.hall_management_reducer);

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState(ModalActionTypes.DETAILS);

  const handleCloseModal = async () => {
    setOpenModal(false);
    await dispatch(clearErrors());
  };

  const handleOpenModal = async (modalType: string) => {
    setModalType(modalType);
    setOpenModal(true);
    await dispatch(clearErrors());
  };

  const loadHalls = async (searchQuery = "") => {
    await dispatch(hallGetAllActionAsync(searchQuery));
  };

  const fetchData = useCallback(
    async () => {
      await dispatch(hallGetAllActionAsync(null));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isLoading === true) {
      fetchData().catch(console.error);
      setIsLoading(false);
    }
  }, [fetchData, isLoading]);

  return (
    <>
      <Head>
        <title>Halls</title>
      </Head>
      <main>
        <TableManagementContainer
          title="Halls"
          loadData={loadHalls}
          handleOpenModal={handleOpenModal}
          loadingStatus={hallState?.loadingStatusGetAll}
          errorMessage={hallState?.errorInfo?.message}
          TableHead={<HallTableHead />}
          TableBody={<HallTableBody halls={halls} handleOpenModal={handleOpenModal} />}
        />
        <Modal
          openModal={openModal}
          handleCloseModal={handleCloseModal}>
          <HallModalContainer modalType={modalType} handleCloseModal={handleCloseModal} />
        </Modal>
      </main>
    </>
  );
}

Halls.getLayout = DashboardPageLayout;

export default Halls;