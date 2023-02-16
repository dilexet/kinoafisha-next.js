import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { Grid, Typography } from "@mui/material";
import { SessionDetailsProps } from "@/modules/dashboard/session-management/types/session-details-props";
import SessionSeatTable from "@/modules/dashboard/session-management/component/session-seat-table";

export default function SessionDetails({
  gridItems,
  sessionState,
  handleRemoveFromBooking,
}: SessionDetailsProps) {
  return (
    <ModalLayout
      title='Show session details'
      error={sessionState?.errorInfo?.message}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
        style={{ minWidth: "550px" }}
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
          <SessionSeatTable
            session={sessionState?.session}
            handleRemoveFromBooking={handleRemoveFromBooking}
          />
        </Grid>
      </Grid>
    </ModalLayout>
  );
}
