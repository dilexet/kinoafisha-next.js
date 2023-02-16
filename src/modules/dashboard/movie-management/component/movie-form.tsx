import { Form, Formik } from "formik";
import {
  Box,
  Grid,
  Avatar,
  FormHelperText,
  useTheme,
  Skeleton,
} from "@mui/material";
import FormTextField from "@/modules/shared/component/form-text-field";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import movieValidationSchema from "@/modules/dashboard/movie-management/utils/movie-validation-schema";
import { MovieFormProps } from "@/modules/dashboard/movie-management/types/movie-form-props";
import UploadImageContainer from "@/modules/upload-image/container";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import GenresContainer from "@/modules/genres/container";
import CountriesContainer from "@/modules/countries/container";
import FormButtonGroup from "@/modules/dashboard/shared/component/form-button-group";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function MovieForm({
  title,
  initialValues,
  handleSubmit,
  handleCancel,
  movieState,
  textFields,
}: MovieFormProps) {
  const theme = useTheme();
  if (initialValues && textFields) {
    return (
      <ModalLayout title={title} error={movieState?.errorInfo?.message}>
        <Formik
          initialValues={initialValues}
          validationSchema={movieValidationSchema}
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
                  <Box
                    component='div'
                    sx={{
                      margin: "10px 0",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {values?.posterURL ? (
                      <Avatar
                        alt='Poster'
                        sx={{ width: 69, height: 69 }}
                        src={IMAGE_URL(values.posterURL)}
                      />
                    ) : (
                      <Skeleton variant='circular' width={69} height={69} />
                    )}
                    <UploadImageContainer setFieldValue={setFieldValue} />
                  </Box>
                  <FormHelperText
                    style={{
                      minWidth: "150px",
                      color: theme.palette.error.main,
                      textAlign: "center",
                    }}
                  >
                    {!values.posterURL ? "Please upload poster" : ""}
                  </FormHelperText>
                </Grid>
                {textFields?.map((value, index) => (
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
                <Grid item>
                  <GenresContainer
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item>
                  <CountriesContainer
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
              </Grid>
              <FormButtonGroup
                handleCancel={handleCancel}
                isLoading={
                  movieState?.loadingStatusCreate ===
                    LOADING_STATUSES.LOADING ||
                  movieState?.loadingStatusUpdate === LOADING_STATUSES.LOADING
                }
              />
            </Box>
          )}
        </Formik>
      </ModalLayout>
    );
  }
}
