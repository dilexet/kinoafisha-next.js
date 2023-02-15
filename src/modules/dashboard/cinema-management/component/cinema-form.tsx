import { Form, Formik } from "formik";
import { Box, Grid } from "@mui/material";
import { CinemaFormProps } from "@/modules/dashboard/cinema-management/types/cinema-form-props";
import FormTextField from "@/modules/shared/component/form-text-field";
import cinemaValidationSchema from "@/modules/dashboard/cinema-management/utils/cinema-validation-schema";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import FormButtonGroup from "@/modules/dashboard/shared/component/form-button-group";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function CinemaForm({
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
          {({
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
                direction='column'
                justifyContent='center'
                alignItems='flex-start'
              >
                {initializeTextField?.map((value, index) => (
                  <Grid item key={index}>
                    <FormTextField
                      id={value.id}
                      type={value.type}
                      label={value.label}
                      name={value.name}
                      value={values[value.name]}
                      variant='outlined'
                      margin='normal'
                      outlinedInputStyle={{ borderRadius: "20px" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      formControlStyle={{ width: "350px" }}
                      {...handleErrors(errors, touched, value?.name)}
                    />
                  </Grid>
                ))}
              </Grid>
              <FormButtonGroup
                handleCancel={handleCancel}
                isLoading={
                  cinemaState?.loadingStatusCreate ===
                    LOADING_STATUSES.LOADING ||
                  cinemaState?.loadingStatusUpdate === LOADING_STATUSES.LOADING
                }
              />
            </Box>
          )}
        </Formik>
      </ModalLayout>
    );
  }
}
