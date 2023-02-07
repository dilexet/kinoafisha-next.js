import { CinemaDetailsProps } from "@/modules/dashboard/cinema-management/types/cinema-details-props";
import { Typography, Grid } from "@mui/material";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import CinemaSkeleton from "@/modules/dashboard/cinema-management/component/cinema-skeleton";

export default function CinemaDetails({
  gridItems,
  cinemaState,
}: CinemaDetailsProps) {
  return (
    <ModalLayout
      title='Show cinema details'
      error={cinemaState?.errorInfo?.message}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        {gridItems ? (
          gridItems?.map((item, index) => (
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
          ))
        ) : (
          <CinemaSkeleton />
        )}
      </Grid>
    </ModalLayout>
  );
}
