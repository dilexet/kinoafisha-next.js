export interface UserProfileUpdateTypes {
  id: string;
  name: string;
  email: string;
  isActivated: boolean;
  isRegisteredLocal: boolean;
}

export interface UserProfile extends UserProfileUpdateTypes {
  orders: BookedOrder[];
}

export interface BookedOrder {
  id: string;
  movieName: string;
  moviePosterURL: string;
  cinemaName: string;
  address: string;
  hallName: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  seats: BookedSeat[];
}

export interface BookedSeat {
  sessionSeatId: string;
  numberSeat: number;
  numberRow: number;
  seatType: string;
  price: number;
}
