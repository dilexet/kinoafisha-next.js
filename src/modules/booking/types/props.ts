import { SessionDetailsState } from "@/modules/booking/reducer";
import { SessionDetailsType, SessionSeatType } from "@/modules/booking/types/session-details-type";

export interface SessionDetailsComponentProps {
  sessionDetailsState: SessionDetailsState;
  handleClose: () => void;
}

export interface SessionMovieInfoComponentProps {
  session: SessionDetailsType;
}

export interface SeatTypeInfoComponentProps {
  sessionSeatTypes: SessionSeatType[];
  hallName: string;
}

export interface SeatTypeComponentProps {
  seatType: SessionSeatType;
}