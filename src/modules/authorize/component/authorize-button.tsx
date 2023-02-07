import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

export function AuthorizeButton({
  isLoading,
  buttonText,
  handleGoogleAuthorize,
  ...props
}) {
  return (
    <Box style={{ margin: "10px 0 30px" }}>
      <LoadingButton
        fullWidth
        type='submit'
        style={{ borderRadius: "20px" }}
        size='large'
        sx={{ mt: 3, mb: 2, mr: 1 }}
        loading={isLoading}
        loadingIndicator='Loading...'
        variant='outlined'
        {...props}
      >
        {buttonText}
      </LoadingButton>
      <Box
        style={{
          width: "100%",
          borderTop: "1px solid #3c3c3c",
          borderBottom: "1px solid #3c3c3c",
          margin: "10px 0 20px",
        }}
      >
        <Typography style={{ textAlign: "center" }}>or</Typography>
      </Box>
      <GoogleLogin
        onSuccess={async (credentialResponse) =>
          await handleGoogleAuthorize(credentialResponse.credential)
        }
        onError={() => console.log("Login failed")}
        shape='pill'
        auto_select={false}
        type='icon'
        size='large'
      />
    </Box>
  );
}
