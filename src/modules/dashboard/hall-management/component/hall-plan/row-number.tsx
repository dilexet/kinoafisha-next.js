import { RowFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { Grid } from "@mui/material";

export default function RowNumber({ row }: { row: RowFieldsType }) {
  return (
    <Grid item style={{ opacity: "0.7", width: "10px" }}>
      {row?.numberRow}
    </Grid>
  );
}
