import { RowFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { generateColor } from "@/modules/shared/utils/generate-color";

export default function SeatsPlan({
                                    row,
                                    handleSeatClick,
                                    selectedSeatType,
                                  }: {
  row: RowFieldsType,
  handleSeatClick: (rowNumber, seatNumber, selectedSeatType) => void,
  selectedSeatType: string
}) {
  return (
    <Grid item
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "80%",
          }}
    >
      {
        row?.seats?.map((seat) => (
          <Box key={seat?.numberSeat}
               style={{ margin: "5px" }}
          >
            <Box
              onClick={() => handleSeatClick(row.numberRow, seat.numberSeat, selectedSeatType)}
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
                borderColor: seat?.seatTypeId ? generateColor(seat?.seatTypeId) : "",
              }}>
              {seat?.numberSeat}
            </Box>
          </Box>
        ))
      }
    </Grid>
  );
}