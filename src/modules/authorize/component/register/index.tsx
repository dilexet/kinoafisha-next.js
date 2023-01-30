import { Formik, Form } from "formik";
import {
  Avatar,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link as LinkMaterial,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthorizeButton } from "@/modules/authorize/component/authorize-button";
import FormTextField from "@/modules/shared/component/form-text-field";
import PasswordFormTextField from "@/modules/authorize/component/password-form-text-field";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import { RegisterComponentProps } from "@/modules/authorize/types/register/register-component-props";
import { RegisterFieldValues } from "@/modules/authorize/constants/register-field-values";
import registerValidationSchema from "@/modules/authorize/utils/register-validation-schema";

export default function RegisterComponent({
                                            authorizeState, handleGoogleAuthorize,
                                            rememberMe, setRememberMe,
                                            handleSubmitForm, handleNavigateToSignIn,
                                          }: RegisterComponentProps) {
  return (
    <Container component="main" sx={{ mt: 2, mb: 10 }} maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography component="h1" variant="h5" fontStyle={{ color: "red" }}>
          {
            authorizeState?.loadingStatus === LOADING_STATUSES.FAILED
              ? authorizeState?.errorInfo?.message
              : ""
          }
        </Typography>

        <Formik
          initialValues={RegisterFieldValues}
          validationSchema={registerValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmitForm}
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
                <FormTextField
                  id="name"
                  type="text"
                  label="Name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  outlinedInputStyle={{ borderRadius: "20px" }}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus={true}
                  {...handleErrors(errors, touched, "name")}
                />
                <FormTextField
                  id="email"
                  type="text"
                  label="Email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  outlinedInputStyle={{ borderRadius: "20px" }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  {...handleErrors(errors, touched, "email")}
                />
                <PasswordFormTextField
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  style={{ borderRadius: "20px" }}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  {...handleErrors(errors, touched, "password")}
                />
                <PasswordFormTextField
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  label="ConfirmPassword"
                  variant="outlined"
                  margin="normal"
                  style={{ borderRadius: "20px" }}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  {...handleErrors(errors, touched, "confirmPassword")}
                />
                <FormControlLabel
                  onChange={() => setRememberMe(rememberMe => !rememberMe)}
                  control={<Checkbox value={rememberMe} color="primary" />}
                  label="Remember me"
                />
                <AuthorizeButton isLoading={authorizeState?.loadingStatus === LOADING_STATUSES.LOADING}
                                 buttonText="Sign up" handleGoogleAuthorize={handleGoogleAuthorize} />
                <Grid container>
                  <Grid item xs>
                    <LinkMaterial color="inherit" variant="body2" style={{ cursor: "pointer" }}
                                  onClick={handleNavigateToSignIn}>
                      Already have an account? Sign in
                    </LinkMaterial>
                  </Grid>
                </Grid>
              </Box>
            )
          }
        </Formik>
      </Box>
    </Container>);
}