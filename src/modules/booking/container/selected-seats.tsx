import SelectedSeatsComponent from "@/modules/booking/component/selected-seats";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SeatType } from "@/modules/booking/types/session-details-type";

export default function SelectedSeatsContainer({ selectedSeatIds, handleCancelSelectSeat }) {
  const bookingState = useAppSelector(x => x.booking_reducer);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeat, setSelectedSeats] = useState<SeatType[]>([]);

  useEffect(() => {
    if (selectedSeatIds) {
      let price = 0;
      const selectedSeatArray: SeatType[] = [];
      bookingState?.session?.hall?.rows.forEach((row) => {
        row?.seats.forEach(seat => {
          if (selectedSeatIds.indexOf(seat?.sessionSeatId) >= 0) {
            price = price + seat.price;
            selectedSeatArray.push(seat);
          }
        });
      });

      price = +price.toFixed(2);

      setTotalPrice(price);
      setSelectedSeats(selectedSeatArray);
    }
  }, [bookingState?.session?.hall?.rows, selectedSeatIds]);

  return (
    <SelectedSeatsComponent
      selectedSeats={selectedSeat}
      session={bookingState?.session}
      totalPrice={totalPrice}
      handleCancelSelectSeat={handleCancelSelectSeat}
    />
  );
}
