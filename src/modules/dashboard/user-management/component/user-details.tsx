import { Typography, Grid } from "@mui/material";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { UserDetailsProps } from "@/modules/dashboard/user-management/types/user-details-props";

export default function UserDetails({
  gridItems,
  userState,
}: UserDetailsProps) {
  return (
    <ModalLayout
      title='Show user details'
      error={userState?.errorInfo?.message}
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
      </Grid>
    </ModalLayout>
  );
}
