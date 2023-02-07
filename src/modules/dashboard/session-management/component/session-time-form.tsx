import { Box } from "@mui/material";
import FormTextField from "@/modules/shared/component/form-text-field";

export default function SessionTimeForm({
                                          values,
                                          errors,
                                          handleChange,
                                        }) {
  return (
    <Box>
      <FormTextField
        id="sessionTime.startDate"
        type="datetime-local"
        label="Start date"
        name="sessionTime.startDate"
        value={values?.sessionTime?.startDate}
        error={errors?.sessionTime?.startDate ?? ""}
        helperText={errors?.sessionTime?.startDate ?? ""}
        variant="outlined"
        margin="normal"
        outlinedInputStyle={{ borderRadius: "20px" }}
        onChange={handleChange}
        formControlStyle={{ width: "350px" }}
      />
      <FormTextField
        id="sessionTime.coefficient"
        type="number"
        label="Coefficient"
        name="sessionTime.coefficient"
        value={values?.sessionTime?.coefficient}
        error={errors?.sessionTime?.coefficient ?? ""}
        helperText={errors?.sessionTime?.coefficient ?? ""}
        variant="outlined"
        margin="normal"
        outlinedInputStyle={{ borderRadius: "20px" }}
        onChange={handleChange}
        formControlStyle={{ width: "350px" }}
      />
    </Box>
  );
}