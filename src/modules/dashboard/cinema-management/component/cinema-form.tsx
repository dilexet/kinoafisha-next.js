import { Form, Formik } from "formik";
import { Box, Grid, Button } from "@mui/material";
import { CinemaFormProps } from "@/modules/dashboard/cinema-management/types/cinema-form-props";
import FormTextField from "@/modules/shared/component/form-text-field";
import cinemaValidationSchema from "@/modules/dashboard/cinema-management/utils/cinema-validation-schema";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import CinemaSkeleton from "@/modules/dashboard/cinema-management/component/cinema-skeleton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CinemaForm({
                                     theme,
                                     title,
                                     initialValues,
                                     handleSubmit,
                                     handleCancel,
                                     initializeTextField,
                                     cinemaState,
                                   }: CinemaFormProps) {
  if (initialValues && initializeTextField) {
    return (
      <ModalLayout title={title} error={cinemaState?.errorInfo?.message}>
        <Formik
          initialValues={initialValues}
          validationSchema={cinemaValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {
            ({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
             }) => (
              <Box component={Form} sx={{ mt: 3 }} onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  {
                    initializeTextField?.map((value, index) => (
                      <Grid item key={index}>
                        <FormTextField
                          id={value.id}
                          type={value.type}
                          label={value.label}
                          name={value.name}
                          value={values[value.name]}
                          variant="outlined"
                          margin="normal"
                          outlinedInputStyle={{ borderRadius: "20px" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          formControlStyle={{ width: "350px" }}
                          {...handleErrors(errors, touched, value?.name)}
                        />
                      </Grid>
                    ))
                  }
                </Grid>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Button
                    variant="outlined"
                    type="submit"
                    style={{
                      color: theme.palette.success.light,
                      borderColor: theme.palette.success.dark,
                      borderRadius: "11px",
                      padding: "7px 14px",
                    }}
                    startIcon={<SaveIcon style={{ fill: theme.palette.success.dark }} />}>
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    style={{
                      color: theme.palette.error.light,
                      borderColor: theme.palette.error.dark,
                      borderRadius: "11px",
                      padding: "7px 14px",
                    }}
                    startIcon={<CancelIcon style={{ fill: theme.palette.error.dark }} />}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            )
          }
        </Formik>
      </ModalLayout>
    );
  } else {
    return (
      <ModalLayout title={title} error={cinemaState?.errorInfo?.message}>
        <CinemaSkeleton />
      </ModalLayout>
    );
  }
}