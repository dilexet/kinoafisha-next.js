import { SeatTypeInfoComponentProps } from "@/modules/booking/types/props";
import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import SeatTypeComponent from "@/modules/booking/component/seat-type";
import BookedSeatTypeComponent from "@/modules/booking/component/booked-seat-type";

export default function SeatTypeInfoComponent({
  hallName,
  sessionSeatTypes,
}: SeatTypeInfoComponentProps) {
  return (
    <Box
      style={{
        margin: "25px 0",
        padding: "10px",
      }}
    >
      <Box
        style={{
          marginBottom: "20px",
        }}
      >
        <Box
          style={{
            display: "inline",
            textAlign: "left",
          }}
        >
          <Typography
            style={{
              fontSize: "1.47em",
              fontWeight: "700",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Seat types
          </Typography>
          <Typography
            style={{
              marginTop: "25px",
              fontSize: "15px",
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {hallName}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        {sessionSeatTypes?.map((seatType, index) => (
          <React.Fragment key={index}>
            <SeatTypeComponent seatType={seatType} />
            <Divider />
          </React.Fragment>
        ))}
        <BookedSeatTypeComponent />
        <Divider />
      </Box>
      <Box
        style={{
          margin: "25px 0",
        }}
      >
        <Button
          disabled
          variant='outlined'
          fullWidth
          style={{
            color: "rgba(255, 255, 255, 0.35)",
            textTransform: "none",
            borderRadius: "22px",
            border: "2px solid #767577",
            fontSize: "1em",
          }}
        >
          Select seats
        </Button>
      </Box>
    </Box>
  );
}
