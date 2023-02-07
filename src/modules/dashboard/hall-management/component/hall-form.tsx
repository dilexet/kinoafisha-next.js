import { HallFormsProps } from "@/modules/dashboard/hall-management/types/hall-forms-props";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { Form, Formik } from "formik";
import { Box, Grid } from "@mui/material";
import FormTextField from "@/modules/shared/component/form-text-field";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import FormButtonGroup from "@/modules/dashboard/shared/component/form-button-group";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import hallValidationSchema from "@/modules/dashboard/hall-management/utils/hall-validation-schema";
import CinemasContainer from "@/modules/cinemas/container";
import HallPlanFormContainer from "@/modules/dashboard/hall-management/container/hall-plan-form-container";

export default function HallForm({
                                   title, hallState,
                                   initialValues, handleSubmit, handleCancel,
                                 }: HallFormsProps) {
  if (initialValues) {
    return (
      <ModalLayout title={title} error={hallState?.errorInfo?.message}>
        <Formik
          initialValues={initialValues}
          validationSchema={hallValidationSchema}
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
               setFieldValue,
             }) => (
              <Box component={Form} sx={{ mt: 3 }} onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid item>
                    <FormTextField
                      id="name"
                      type="text"
                      label="Name"
                      name="name"
                      value={values.name}
                      variant="outlined"
                      margin="normal"
                      outlinedInputStyle={{ borderRadius: "20px" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      formControlStyle={{ width: "350px" }}
                      {...handleErrors(errors, touched, "name")}
                    />
                  </Grid>
                  <Grid item>
                    <CinemasContainer values={values} setFieldValue={setFieldValue}
                                      errors={errors} touched={touched}
                                      handleBlur={handleBlur}
                    />
                  </Grid>
                  <HallPlanFormContainer values={values} setFieldValue={setFieldValue} />
                </Grid>
                <FormButtonGroup handleCancel={handleCancel} isLoading={
                  hallState?.loadingStatusCreate === LOADING_STATUSES.LOADING ||
                  hallState?.loadingStatusUpdate === LOADING_STATUSES.LOADING
                } />
              </Box>
            )
          }
        </Formik>
      </ModalLayout>
    );
  }
}