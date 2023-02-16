import SelectedSeatsComponent from "@/modules/booking/component/selected-seats";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SeatType } from "@/modules/booking/types/session-details-type";
import { useRouter } from "next/router";
import { getTokens } from "@/modules/authorize/utils/token-service";

export default function SelectedSeatsContainer({
  selectedSeatIds,
  handleCancelSelectSeat,
}) {
  const router = useRouter();
  const bookingState = useAppSelector((x) => x.booking_reducer);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeat, setSelectedSeats] = useState<SeatType[]>([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    if (selectedSeatIds) {
      let price = 0;
      const selectedSeatArray: SeatType[] = [];
      bookingState?.session?.hall?.rows.forEach((row) => {
        row?.seats.forEach((seat) => {
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

  const handleConfirmOrder = async () => {
    const tokens = getTokens();
    if (tokens && tokens?.accessToken && tokens?.refreshToken) {
      await router.push({
        pathname: `/confirm-booking/${bookingState?.session?.id}`,
        query: { seats: selectedSeatIds },
      });
    } else {
      setOpenLoginModal(true);
    }
  };

  return (
    <SelectedSeatsComponent
      selectedSeats={selectedSeat}
      session={bookingState?.session}
      totalPrice={totalPrice}
      handleCancelSelectSeat={handleCancelSelectSeat}
      handleConfirmOrder={handleConfirmOrder}
      openLoginModal={openLoginModal}
      setOpenLoginModal={setOpenLoginModal}
      openRegisterModal={openRegisterModal}
      setOpenRegisterModal={setOpenRegisterModal}
    />
  );
}
