export interface SessionDetailsType {
  id: string;
  startDate: string;
  endDate: string;
  coefficient: number;
  hallWorkLoad: number;
  movie: MovieType;
  hall: HallType;
  sessionSeatTypes: SessionSeatType[];
}

export interface MovieType {
  id: string;
  name: string;
  description: string;
  posterURL: string;
  premiereDate: string;
  durationInMinutes: number;
  genres: string[];
  countries: string[];
}

export interface SessionSeatType {
  id: string;
  price: number;
  name: string;
  colorHex: string;
}

export interface HallType {
  id: string;
  name: string;
  cinemaName: string;
  address: string;
  rows: RowType[];
}

export interface RowType {
  id: string;
  numberRow: number;
  seats: SeatType[];
}

export interface SeatType {
  id: string;
  sessionSeatId: string;
  numberSeat: number;
  numberRow: number;
  price: number;
  seatType: string;
  seatTypeId: string;
  colorHex: string;
  ticketState: string;
}