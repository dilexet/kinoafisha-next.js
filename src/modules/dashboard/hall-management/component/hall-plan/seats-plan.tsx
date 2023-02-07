import { RowFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SeatTypeState } from "@/modules/seat-types/reducer";

export default function SeatsPlan({
  row,
  handleSeatClick,
  selectedSeatType,
}: {
  row: RowFieldsType;
  handleSeatClick: (rowNumber, seatNumber, selectedSeatType) => void;
  selectedSeatType: string;
}) {
  const seatTypeState = useAppSelector<SeatTypeState>(
    (x) => x.seat_types_reducer,
  );
  return (
    <Grid
      item
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "80%",
      }}
    >
      {row?.seats?.map((seat) => (
        <Box key={seat?.numberSeat} style={{ margin: "5px" }}>
          <Box
            onClick={() =>
              handleSeatClick(row.numberRow, seat.numberSeat, selectedSeatType)
            }
            style={{
              width: "30px",
              height: "30px",
              border: "2px solid",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: "pointer",
              borderColor: seat?.seatTypeId
                ? seatTypeState?.seatTypes?.find(
                    (x) => x?.id === seat?.seatTypeId,
                  )?.color
                : "",
            }}
          >
            {seat?.numberSeat}
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
