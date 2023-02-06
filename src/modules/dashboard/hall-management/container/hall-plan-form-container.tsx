import { useEffect, useState } from "react";
import {
  HallFieldsType,
  RowFieldsType,
  SeatFieldsType, SeatTypePriceFieldsType,
} from "@/modules/dashboard/hall-management/types/hall-field-types";
import HallPlanForm from "@/modules/dashboard/hall-management/component/hall-plan-form";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SeatTypeState } from "@/modules/seat-types/reducer";

export default function HallPlanFormContainer({
                                                values,
                                                setFieldValue,
                                              }: { values: HallFieldsType, setFieldValue: any }) {
  const [numberOfRows, setNumberOfRows] = useState(values?.rows?.length);
  const [numberOfSeats, setNumberOfSeats] = useState([]);

  const [selectedSeatType, setSelectedSeatType] = useState("");
  const [isSeatChange, setIsSeatChange] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading === true) {
      if (values?.rows?.length > 0) {
        const numberOfSeatsTemp = [];
        values?.rows?.forEach(x => numberOfSeatsTemp.push(x.seats?.length));
        setNumberOfSeats(numberOfSeatsTemp);
      }
      setIsLoading(false);
    }
  }, [isLoading, values?.rows]);

  const handleSelectSeatType = (seatTypeId: string) => {
    setSelectedSeatType(prevState => prevState === seatTypeId ? "" : seatTypeId);
  };

  const handleChangeNumberOfRows = (e) => {
    const numberOfRowsValue = e?.target?.value;
    setNumberOfRows(numberOfRowsValue);
    const rowsArray: RowFieldsType[] = [];
    for (let i = 0; i < numberOfRowsValue; i++) {
      rowsArray.push({ numberRow: i + 1, seats: [] });
    }
    setFieldValue("rows", rowsArray);
    setNumberOfSeats(Array(+numberOfRowsValue).fill(0));
  };

  const handleChangeNumberOfSeats = (e, indexValue) => {
    const numberOfSeats = e?.target?.value == "" ? e?.target?.value : +e?.target?.value;
    setNumberOfSeats(prevState => prevState.map((item, index) => (index === indexValue ? numberOfSeats : item)));


    const seatsArray: SeatFieldsType[] = [];
    for (let i = 0; i < numberOfSeats; i++) {
      seatsArray.push({ numberSeat: i + 1, seatTypeId: "" });
    }
    const newRows = values?.rows?.map((item) => (item.numberRow === indexValue + 1 ? {
      ...item,
      seats: seatsArray,
    } : item));
    setFieldValue("rows", newRows);
  };

  const handleSeatClick = (rowNumber, seatNumber, selectedSeatType) => {
    if (selectedSeatType) {
      const newRows = values?.rows?.map((row) =>
        (row.numberRow === rowNumber ? {
          ...row,
          seats: row.seats.map(seat => {
            if (seat.numberSeat === seatNumber) {
              return {
                ...seat,
                seatTypeId: selectedSeatType,
              };
            }
            return seat;
          }),
        } : row));
      setFieldValue("rows", newRows);
    } else {
      const newRows = values?.rows?.map((row) =>
        (row.numberRow === rowNumber ? {
          ...row,
          seats: row.seats.map(seat => {
            if (seat.numberSeat === seatNumber && seat.seatTypeId) {
              return {
                ...seat,
                seatTypeId: "",
              };
            }
            return seat;
          }),
        } : row));
      setFieldValue("rows", newRows);
    }
    setIsSeatChange(true);
  };


  useEffect(() => {
    if (isSeatChange) {
      const seatTypeIds: SeatTypePriceFieldsType[] = [];
      values?.rows?.forEach(row => row?.seats?.forEach(seat => {
        if (seat.seatTypeId && !seatTypeIds.find(x => x.seatTypeId === seat?.seatTypeId)) {
          seatTypeIds.push({
            seatTypeId: seat?.seatTypeId,
            price: values?.seatTypePrices?.find(x => x.seatTypeId === seat?.seatTypeId).price ?? 0,
          });
        }
      }));
      setFieldValue("seatTypePrices", seatTypeIds);
      setIsSeatChange(false);
    }
  }, [isSeatChange, setFieldValue, values?.rows, values?.seatTypePrices]);

  const handleChangeSeatTypePrices = (event, seatTypeId) => {
    const price = event?.target?.value == "" ? event?.target?.value : +event?.target?.value;
    const seatTypeIds = values?.seatTypePrices?.map(el => (el.seatTypeId === seatTypeId ? {
      ...el,
      price: price,
    } : el));
    setFieldValue("seatTypePrices", seatTypeIds);
  };

  const seatTypeState = useAppSelector<SeatTypeState>(x => x.seat_types_reducer);
  const [maxWidth, setMaxWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.onresize = () => {
      if (maxWidth - 240 > window.innerWidth || window.innerWidth > maxWidth + 240) {
        setMaxWidth(window.innerWidth);
      }
    };
  }, [maxWidth]);

  return (
    <HallPlanForm rows={values.rows} handleSelectSeatType={handleSelectSeatType}
                  selectedSeatType={selectedSeatType}
                  handleChangeNumberOfRows={handleChangeNumberOfRows}
                  handleChangeNumberOfSeats={handleChangeNumberOfSeats}
                  numberOfRows={numberOfRows} numberOfSeats={numberOfSeats}
                  handleSeatClick={handleSeatClick}
                  handleChangeSeatTypePrices={handleChangeSeatTypePrices}
                  seatTypePrices={values?.seatTypePrices} seatTypeState={seatTypeState}
                  maxWidth={maxWidth}
    />
  );
}