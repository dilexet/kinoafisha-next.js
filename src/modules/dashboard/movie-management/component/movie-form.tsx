import { Form, Formik } from "formik";
import {
  Box, Grid, Button, Avatar,
  FormHelperText,
} from "@mui/material";
import FormTextField from "@/modules/shared/component/form-text-field";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import ModalLayout from "@/modules/dashboard/shared/component/modal-layout";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import movieValidationSchema from "@/modules/dashboard/movie-management/utils/movie-validation-schema";
import { MovieFormProps } from "@/modules/dashboard/movie-management/types/movie-form-props";
import UploadImageContainer from "@/modules/upload-image/container";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import GenresContainer from "@/modules/genres/container";
import CountriesContainer from "@/modules/countries/container";

export default function MovieForm({
                                    theme,
                                    title,
                                    initialValues,
                                    handleSubmit,
                                    handleCancel,
                                    movieState,
                                    imageState,
                                    textFields,
                                  }: MovieFormProps) {
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
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Box component="div" sx={{
                      margin: "10px 0",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Avatar
                        alt="Poster"
                        sx={{ width: 69, height: 69 }}
                        src={values.posterURL ? IMAGE_URL(values.posterURL) : ""} />
                      <UploadImageContainer setFieldValue={setFieldValue} />
                    </Box>
                    <FormHelperText
                      style={{ minWidth: "150px", color: theme.palette.error.main, textAlign: "center" }}>
                      {!values.posterURL ? "Please upload poster" : ""}
                    </FormHelperText>
                  </Grid>
                  {
                    textFields?.map((value, index) => (
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
                  <Grid item>
                    <GenresContainer values={values} setFieldValue={setFieldValue} />
                  </Grid>
                  <Grid item>
                    <CountriesContainer values={values} setFieldValue={setFieldValue} />
                  </Grid>
                </Grid>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px",
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
  }
}