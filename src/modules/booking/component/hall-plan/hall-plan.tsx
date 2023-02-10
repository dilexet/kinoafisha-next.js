import { Box, Typography } from "@mui/material";
import React from "react";
import { HallPlanProps } from "@/modules/booking/types/hall-plan-props";
import HallRowsPlan from "@/modules/booking/component/hall-plan/hall-rows-plan";

export default function HallPlan({ hall }: HallPlanProps) {
  return (
    <Box
      style={{
        textAlign: "center",
        margin: "25px 0",
        padding: "10px",
      }}
    >
      <Box
        style={{
          verticalAlign: "top",
          position: "relative",
          maxWidth: "100%",
        }}
      >
        <Box
          style={{
            overflow: "hidden",
            position: "relative",
            maxWidth: "100%",
          }}
        >
          <Box
            style={{
              margin: "10px 0 150px",
            }}>
            <Box style={{
              border: "2px solid rgba(255, 255, 255, 0.8)",
              maxWidth: "75%",
              margin: "auto",
            }} />
            <Typography
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "700",
                color: "rgba(255, 255, 255, 0.8)",
              }}>
              Screen
            </Typography>
          </Box>
          <Box
            style={{
              margin: "auto",
            }}
          >
            <Box>
              {hall?.rows?.map((row) => (
                <React.Fragment key={row.id}>
                  <HallRowsPlan row={row} />
                </React.Fragment>
              ))}
              <h1></h1>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
