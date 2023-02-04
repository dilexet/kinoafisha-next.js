import { HallType } from "@/modules/dashboard/hall-management/types/hall-type";

export interface HallTableBodyProps {
  halls: HallType[],
  handleOpenModal: (value: string) => void
}