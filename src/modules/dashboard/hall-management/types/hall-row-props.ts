import { HallType } from "@/modules/dashboard/hall-management/types/hall-type";

export interface HallRowContainerProps {
  hall: HallType;
  index: number;
  handleOpenModal: (modalType: string) => void;
}

export interface HallRowComponentProps {
  hall: HallType;
  index: number;
  handleGetDetails: () => void;
  handleUpdate: () => void;
  handleRemove: () => void;
  handleClearErrors: () => void;
}
