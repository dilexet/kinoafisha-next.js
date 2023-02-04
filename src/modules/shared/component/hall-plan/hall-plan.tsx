import { Box } from "@mui/material";
import { HallDetailsType } from "@/modules/dashboard/hall-management/types/hall-type";
import React from "react";
import HallRowsPlan from "@/modules/shared/component/hall-plan/hall-rows-plan";

export default function HallPlan({ hall }: { hall: HallDetailsType }) {
  return (
    <Box
      style={{
        textAlign: "center",
        margin: "25px 0",
        padding: "10px",
      }}>
      <Box
        style={{
          verticalAlign: "top",
          position: "relative",
          maxWidth: "100%",
        }}>
        <Box style={{
          overflow: "hidden",
          position: "relative",
          maxWidth: "100%",
        }}>
          <Box
            style={{
              margin: "auto",
            }}>
            <Box>
              {
                hall?.rows?.map((row) => (
                  <React.Fragment key={row.id}>
                    <HallRowsPlan row={row} />
                  </React.Fragment>
                ))
              }
              <h1></h1>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}