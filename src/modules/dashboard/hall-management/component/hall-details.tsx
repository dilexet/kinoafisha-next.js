import { HallDetailsProps } from "@/modules/dashboard/hall-management/types/hall-details-props";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { Grid, Typography, Box } from "@mui/material";
import HallPlan from "@/modules/shared/component/hall-plan/hall-plan";

export default function HallDetails({
  gridItems,
  hallState,
}: HallDetailsProps) {
  return (
    <ModalLayout
      title='Show hall details'
      error={hallState?.errorInfo?.message}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        {gridItems?.map((item, index) => (
          <Grid
            item
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "1.625em",
                opacity: "0.8",
              }}
            >
              {item.property}:&nbsp;
            </Typography>
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "1.625em",
                textAlign: "center",
              }}
            >
              {item.value}
            </Typography>
          </Grid>
        ))}
        <Grid item>
          <Box>
            <HallPlan hall={hallState?.hall} />
          </Box>
        </Grid>
      </Grid>
    </ModalLayout>
  );
}
