import { SessionType } from "@/modules/dashboard/session-management/types/session-type";

export interface SessionRowContainerProps {
  session: SessionType;
  index: number;
  handleOpenModal: (modalType: string) => void;
}

export interface SessionRowComponentProps {
  session: SessionType;
  index: number;
  handleGetDetails: () => void;
  handleUpdate: () => void;
  handleRemove: () => void;
  handleClearErrors: () => void;
}