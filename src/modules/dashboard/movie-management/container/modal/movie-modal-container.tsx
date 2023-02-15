import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import MovieUpdateContainer from "@/modules/dashboard/movie-management/container/modal/movie-update-container";
import MovieCreateContainer from "@/modules/dashboard/movie-management/container/modal/movie-create-container";
import { useCallback, useEffect, useState } from "react";
import { genresGetAllAsync } from "@/modules/genres/action";
import { countriesGetAllAsync } from "@/modules/countries/action";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import MovieDetailsContainer from "@/modules/dashboard/movie-management/container/modal/movie-details-container";
import Loading from "@/modules/loading";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function MovieModalContainer({ modalType, handleCloseModal }) {
  const dispatch = useAppDispatch();
  const movieState = useAppSelector((x) => x.movie_management_reducer);
  const [loadData, setLoadData] = useState(true);

  const fetchData = useCallback(async () => {
    await dispatch(genresGetAllAsync());
    await dispatch(countriesGetAllAsync(null));
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
    movieState?.loadingStatusGetOne === LOADING_STATUSES.LOADING
  ) {
    return <Loading />;
  }

  if (modalType === ModalActionTypes.DETAILS) {
    return <MovieDetailsContainer />;
  }

  if (modalType === ModalActionTypes.UPDATE) {
    return <MovieUpdateContainer handleCloseModal={handleCloseModal} />;
  }

  if (modalType === ModalActionTypes.CREATE) {
    return <MovieCreateContainer handleCloseModal={handleCloseModal} />;
  }
}
