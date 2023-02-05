import { Tooltip, Typography, Box } from "@mui/material";
import { generateColor } from "@/modules/shared/utils/generate-color";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import { SeatTypeState } from "@/modules/seat-types/reducer";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function SeatTypesPlan({ selectedSeatType, handleSelectSeatType }) {
  const seatTypeState = useAppSelector<SeatTypeState>(x => x.seat_types_reducer);
  if (seatTypeState?.loadingStatus === LOADING_STATUSES.IDLE) {
    return (
      <Box style={{
        marginBottom: "20px",
      }}>
        <Box style={{
          margin: "10px 0 20px",
        }}>
          <Typography style={{
            fontSize: "20px",
            fontWeight: "600",
            opacity: "0.5",
            textAlign: "center",
          }}>
            Select a place type, then click on a place to specify its type
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            height: "50px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {
            seatTypeState?.seatTypes?.map((seatType) => (
              <Box key={seatType?.id}>
                <Tooltip title={seatType?.name}>
                  <Box
                    onClick={() => handleSelectSeatType(seatType?.id)}
                    style={{
                      width: selectedSeatType === seatType?.id ? "35px" : "30px",
                      height: selectedSeatType === seatType?.id ? "35px" : "30px",
                      border: "5px solid",
                      borderColor: generateColor(seatType?.id),
                      borderRadius: "5px",
                      margin: "0 10px",
                      cursor: "pointer",
                    }} />
                </Tooltip>
              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}