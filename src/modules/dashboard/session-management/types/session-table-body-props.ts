import { SessionType } from "@/modules/dashboard/session-management/types/session-type";

export interface SessionTableBodyProps {
  sessions: SessionType[];
  handleOpenModal: (value: string) => void;
}
