import { SessionFormProps } from "@/modules/dashboard/session-management/types/session-form-props";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import { Form, Formik } from "formik";
import { Box, Grid } from "@mui/material";
import FormButtonGroup from "@/modules/dashboard/shared/component/form-button-group";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import CinemasContainer from "@/modules/cinemas/container";
import MoviesContainer from "@/modules/movies/container";
import HallsContainer from "@/modules/halls/container";
import SessionCreateTimesContainer from "@/modules/dashboard/session-management/container/session-create-times-container";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import SessionTimeForm from "@/modules/dashboard/session-management/component/session-time-form";

export default function SessionForm({
  title,
  modalType,
  sessionState,
  initialValues,
  handleSubmit,
  handleCancel,
  validationSchema,
}: SessionFormProps) {
  if (initialValues) {
    return (
      <ModalLayout title={title} error={sessionState?.errorInfo?.message}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
            setFieldValue,
          }) => (
            <Box component={Form} sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='flex-start'
              >
                <Grid item>
                  <CinemasContainer
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                </Grid>
                <Grid item>
                  <MoviesContainer
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                </Grid>
                <Grid item>
                  <HallsContainer
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                </Grid>
                <Grid item>
                  {modalType === ModalActionTypes.CREATE ? (
                    <SessionCreateTimesContainer
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  ) : modalType === ModalActionTypes.UPDATE ? (
                    <SessionTimeForm
                      values={values}
                      errors={errors}
                      handleChange={handleChange}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
              <FormButtonGroup
                handleCancel={handleCancel}
                isLoading={
                  sessionState?.loadingStatusCreate ===
                    LOADING_STATUSES.LOADING ||
                  sessionState?.loadingStatusUpdate === LOADING_STATUSES.LOADING
                }
              />
            </Box>
          )}
        </Formik>
      </ModalLayout>
    );
  }
}
