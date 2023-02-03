import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { selectAll } from "@/modules/dashboard/movie-management/reducer";
import { clearErrors } from "@/modules/dashboard/movie-management/reducer";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import { movieGetAllActionAsync } from "@/modules/dashboard/movie-management/action";
import Head from "next/head";
import { DashboardPageLayout } from "@/pages/dashboard/index";
import TableManagementContainer from "@/modules/dashboard/shared/component/table-management-container";
import MovieTableHead from "@/modules/dashboard/movie-management/component/movie-table-head";
import MovieTableBody from "@/modules/dashboard/movie-management/component/movie-table-body";
import Modal from "@/modules/dashboard/shared/component/modal";
import { clearState } from "@/modules/upload-image/reducer";
import MovieModalContainer from "@/modules/dashboard/movie-management/container/modal/movie-modal-container";

export function Movies() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAll);
  const movieState = useAppSelector((x) => x.movie_management_reducer);

  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(ModalActionTypes.DETAILS);

  const handleCloseModal = async () => {
    setOpenModal(false);
    await dispatch(clearErrors());
    await dispatch(clearState());
  };

  const handleOpenModal = async (modalType: string) => {
    setModalType(modalType);
    setOpenModal(true);
    await dispatch(clearErrors());
  };

  const loadMovies = async (searchQuery = "") => {
    await dispatch(movieGetAllActionAsync(searchQuery));
  };

  const fetchData = useCallback(
    async () => {
      await dispatch(movieGetAllActionAsync(null));
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
        <title>Movies</title>
      </Head>
      <main>
        <TableManagementContainer
          title="Movies"
          loadData={loadMovies}
          handleOpenModal={handleOpenModal}
          loadingStatus={movieState?.loadingStatusGetAll}
          errorMessage={movieState?.errorInfo?.message}
          TableHead={<MovieTableHead />}
          TableBody={<MovieTableBody movies={movies} handleOpenModal={handleOpenModal} />}
        />
        <Modal
          openModal={openModal}
          handleCloseModal={handleCloseModal}>
          <MovieModalContainer modalType={modalType} handleCloseModal={handleCloseModal} />
        </Modal>
      </main>
    </>
  );
}


Movies.getLayout = DashboardPageLayout;

export default Movies;