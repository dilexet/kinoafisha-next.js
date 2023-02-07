import { Box } from "@mui/material";
import React from "react";
import HallRowsPlan from "@/modules/shared/component/hall-plan/hall-rows-plan";
import { HallPlanProps } from "@/modules/shared/types/hall-plan-props";

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
