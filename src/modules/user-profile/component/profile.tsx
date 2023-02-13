import { Form, Formik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { ProfileComponentProps } from "@/modules/user-profile/types/props";
import profileValidationSchema from "@/modules/user-profile/utils/profile-validation-schema";
import FormTextField from "@/modules/shared/component/form-text-field";
import { handleErrors } from "@/modules/shared/utils/handle-errors";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";

export default function ProfileComponent({ profileState, handleSubmit, initialValues }: ProfileComponentProps) {
  return (
    <Box style={{
      marginTop: "40px",
      width: "100%",
    }}>
      <Box style={{
        maxWidth: "840px",
        display: "flex",
        flexDirection: "column",
      }}>
        <Box style={{
          marginBottom: "18px",
          width: "100%",
        }}>
          <Typography component="h2" style={{
            opacity: "0.8",
            paddingBottom: "10px",
            float: "left",
            fontSize: "2.25em",
            fontWeight: "700",
            margin: 0,
          }}>
            My details
          </Typography>
        </Box>
        {
          profileState?.profile?.isActivated ?
            <></> :
            <Box style={{
              width: "100%",
            }}>
              <Typography component="h2" style={{
                opacity: "0.8",
                paddingBottom: "18px",
                float: "left",
                fontSize: "1.125em",
                fontWeight: "500",
                margin: 0,
                color: "#AA4A44",
              }}>
                {"You need to activate your account. Check your email."}
              </Typography>
            </Box>
        }
        {
          profileState?.loadingStatusUpdate === LOADING_STATUSES.FAILED ?
            <Box style={{
              width: "100%",
            }}>
              <Typography component="h2" style={{
                opacity: "0.8",
                paddingBottom: "18px",
                float: "left",
                fontSize: "1.125em",
                fontWeight: "500",
                margin: 0,
                color: "#D2042D",
              }}>
                {profileState?.errorInfo?.message ?? ""}
              </Typography>
            </Box> :
            <></>
        }
        <Box style={{
          maxWidth: "610px",
          margin: "10px 0",
          position: "relative",
        }}>
          <Formik
            initialValues={initialValues}
            validationSchema={profileValidationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
            enableReinitialize
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
                    label="Name"
                    type="text"
                    name="name"
                    variant="outlined"
                    required={false}
                    formControlStyle={{
                      margin: "10px 0",
                    }}
                    outlinedInputStyle={{
                      borderRadius: "5px",
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    {...handleErrors(errors, touched, "name")}
                  />
                  {
                    profileState?.profile?.isRegisteredLocal ?
                      <>
                        <FormTextField
                          id="email"
                          label="Email"
                          type="text"
                          name="email"
                          variant="outlined"
                          required={false}
                          formControlStyle={{
                            margin: "10px 0",
                          }}
                          outlinedInputStyle={{
                            borderRadius: "5px",
                            background: "rgba(255, 255, 255, 0.1)",
                          }}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          {...handleErrors(errors, touched, "email")}
                        />
                        <FormTextField
                          id="oldPassword"
                          label="Old password"
                          type="password"
                          name="oldPassword"
                          variant="outlined"
                          required={false}
                          formControlStyle={{
                            margin: "10px 0",
                          }}
                          outlinedInputStyle={{
                            borderRadius: "5px",
                            background: "rgba(255, 255, 255, 0.1)",
                          }}
                          value={values.oldPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="oldPassword"
                          {...handleErrors(errors, touched, "oldPassword")}
                        />
                        <FormTextField
                          id="newPassword"
                          label="New password"
                          type="password"
                          name="newPassword"
                          variant="outlined"
                          required={false}
                          formControlStyle={{
                            margin: "10px 0",
                          }}
                          outlinedInputStyle={{
                            borderRadius: "5px",
                            background: "rgba(255, 255, 255, 0.1)",
                          }}
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="newPassword"
                          {...handleErrors(errors, touched, "newPassword")}
                        /></> : <></>
                  }
                  <Box style={{
                    marginTop: "20px",
                  }}>
                    <Button
                      disabled={profileState?.loadingStatusUpdate === LOADING_STATUSES.LOADING}
                      type="submit"
                      variant="outlined"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        border: "2px solid rgba(255, 255, 255, 0.8)",
                        borderRadius: "22px",
                        height: "44px",
                        padding: "0 30px",
                        position: "relative",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "1em",
                        textAlign: "center",
                        textTransform: "none",
                        background: "rgba(255, 255, 255, 0)",
                      }}>
                      Save changes
                    </Button>
                  </Box>
                </Box>
              )
            }
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}