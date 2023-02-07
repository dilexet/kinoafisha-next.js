export interface SessionType {
  id: string;
  startDate: string;
  endDate: string;
  coefficient: number;
  movieId: string;
  movieName: string;
  cinemaId: string;
  cinemaName: string;
  hallId: string;
  hallName: string;
}

export interface SessionDetailsType {
  sessionData: SessionType;

  sessionSeats: SessionSeatType[];
}

export interface SessionSeatType {
  id: string;
  ticketState: string;
  seatId: string;
  numberSeat: number;
  numberRow: number;
  price: number;
  seatType: string;
}
