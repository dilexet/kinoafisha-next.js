export interface HallFieldsType {
  id: string;
  name: string;
  cinemaId: string;
  rows: RowFieldsType[];
  seatTypePrices: SeatTypePriceFieldsType[];
}

export interface SeatTypePriceFieldsType {
  price: number;
  seatTypeId: string;
}

export interface RowFieldsType {
  numberRow: number;
  seats: SeatFieldsType[];
}

export interface SeatFieldsType {
  numberSeat: number;
  seatTypeId: string;
}
