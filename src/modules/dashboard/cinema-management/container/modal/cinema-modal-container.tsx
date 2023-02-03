import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import CinemaDetailsContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-details-container";
import CinemaCreateContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-create-container";
import CinemaUpdateContainer from "@/modules/dashboard/cinema-management/container/modal/cinema-update-container";

export default function CinemaModalContainer({ modalType, handleCloseModal }) {

  if (modalType === ModalActionTypes.DETAILS) {
    return (
      <CinemaDetailsContainer />
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
        id: "country",
        name: "country",
        label: "Country",
        type: "text",
      },
      {
        id: "city",
        name: "city",
        label: "City",
        type: "text",
      },
      {
        id: "street",
        name: "street",
        label: "Street",
        type: "text",
      },
      {
        id: "houseNumber",
        name: "houseNumber",
        label: "House number",
        type: "number",
      },
    ];

    if (modalType === ModalActionTypes.UPDATE) {
      return (
        <CinemaUpdateContainer handleCloseModal={handleCloseModal} textFields={textFields} />
      );
    }

    if (modalType === ModalActionTypes.CREATE) {
      return (
        <CinemaCreateContainer handleCloseModal={handleCloseModal} textFields={textFields} />
      );
    }

  }
}
