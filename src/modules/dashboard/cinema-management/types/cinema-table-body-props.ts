import { CinemaType } from "@/modules/dashboard/cinema-management/types/cinema-type";

export interface CinemaTableBodyProps {
  cinemas: CinemaType[],
  handleOpenModal: (value: string) => void
}