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
import { AuthorizeButton } from "@/authorize/component/authorize-button";
import { LoginFieldValues } from "@/authorize/constants/login-field-values";
import FormTextField from "@/shared/component/form-text-field";
import PasswordFormTextField from "@/authorize/component/password-form-text-field";
import loginValidationSchema from "@/authorize/utils/login-validation-schema";
import { LOADING_STATUSES } from "@/shared/constants/redux-constants";
import { LoginComponentProps } from "@/authorize/types/login/login-component-props";
import { handleErrors } from "@/shared/utils/handle-errors";

export default function LoginComponent({
                                         authorizeState, handleGoogleAuthorize,
                                         rememberMe, setRememberMe,
                                         handleSubmitForm, handleNavigateToSignUp,
                                       }: LoginComponentProps) {
  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="sm">
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
          Sign in
        </Typography>
        <Typography component="h1" variant="h5" fontStyle={{ color: "red" }}>
          {
            authorizeState?.loadingStatus === LOADING_STATUSES.FAILED
              ? authorizeState?.errorInfo?.message
              : ""
          }
        </Typography>

        <Formik
          initialValues={LoginFieldValues}
          validationSchema={loginValidationSchema}
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
                  autoFocus={true}
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
                <FormControlLabel
                  onChange={() => setRememberMe(rememberMe => !rememberMe)}
                  control={<Checkbox value={rememberMe} color="primary" />}
                  label="Remember me"
                />
                <AuthorizeButton isLoading={authorizeState?.loadingStatus === LOADING_STATUSES.LOADING}
                                 buttonText="Sign in" handleGoogleAuthorize={handleGoogleAuthorize} />
                <Grid container>
                  <Grid item xs>
                    <LinkMaterial color="inherit" variant="body2" style={{ cursor: "pointer" }}
                                  onClick={handleNavigateToSignUp}>
                      {"Don't have an account? Sign Up"}
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