import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { MovieManagementState } from "@/modules/dashboard/movie-management/reducer";

export interface MovieDetailsProps {
  gridItems: GridItemsType[];
  movieState: MovieManagementState;
}