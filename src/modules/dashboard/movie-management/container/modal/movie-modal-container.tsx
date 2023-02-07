import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import MovieUpdateContainer from "@/modules/dashboard/movie-management/container/modal/movie-update-container";
import MovieCreateContainer from "@/modules/dashboard/movie-management/container/modal/movie-create-container";
import { useCallback, useEffect, useState } from "react";
import { genresGetAllAsync } from "@/modules/genres/action";
import { countriesGetAllAsync } from "@/modules/countries/action";
import { useAppDispatch } from "@/modules/shared/redux/hooks";
import MovieDetailsContainer from "@/modules/dashboard/movie-management/container/modal/movie-details-container";

export default function MovieModalContainer({ modalType, handleCloseModal }) {
  const dispatch = useAppDispatch();
  const [loadData, setLoadData] = useState(true);

  const fetchData = useCallback(
    async () => {
      await dispatch(genresGetAllAsync());
      await dispatch(countriesGetAllAsync(null));
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
      <MovieDetailsContainer />
    );
  } else {
    const textFields = [
      {
        id: "name",
        name: "name",
        label: "Name",
        type: "text",
      },
      {
        id: "description",
        name: "description",
        label: "Description",
        type: "text",
      },
      {
        id: "premiereDate",
        name: "premiereDate",
        label: "Premiere date",
        type: "date",
      },
      {
        id: "durationInMinutes",
        name: "durationInMinutes",
        label: "Duration (minutes)",
        type: "number",
      },
    ];

    if (modalType === ModalActionTypes.UPDATE) {
      return (
        <MovieUpdateContainer handleCloseModal={handleCloseModal} textFields={textFields} />
      );
    }

    if (modalType === ModalActionTypes.CREATE) {
      return (
        <MovieCreateContainer handleCloseModal={handleCloseModal} textFields={textFields} />
      );
    }

  }
}
