export interface HallType {
  id: string;
  cinemaId: string;
  cinemaName: string;
  name: string;
  numberOfRows: number;
  numberOfSeats: number;
}

export interface HallDetailsType {
  id: string;
  cinemaId: string;
  cinemaName: string;
  name: string;
  rows: RowType[];
}

export interface RowType {
  id: string;
  numberRow: number;
  seats: SeatType[];
}

export interface SeatType {
  id: string;
  numberSeat: number;
  price: number;
  seatType: SeatTypeType;
}

export interface SeatTypeType {
  id: string;
  name: string;
}