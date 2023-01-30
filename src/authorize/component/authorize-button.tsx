import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Box, Link as LinkMaterial } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export function AuthorizeButton({
                                  isLoading,
                                  buttonText,
                                  handleGoogleAuthorize,
                                  ...props
                                }) {

  return (
    <Box>
      <LoadingButton
        fullWidth
        type="submit"
        style={{ borderRadius: "20px" }}
        size="large"
        sx={{ mt: 3, mb: 2, mr: 1 }}
        loading={isLoading}
        loadingIndicator="Loading..."
        variant="outlined"
        {...props}
      >
        {buttonText}
      </LoadingButton>
      <Button
        fullWidth
        style={{ borderRadius: "20px" }}
        onClick={handleGoogleAuthorize}
        size="large"
        sx={{ mt: 3, mb: 2 }}
        variant="outlined"
        startIcon={<GoogleIcon />}>
        {buttonText + " with google"}
      </Button>
      <LinkMaterial color="inherit" variant="body2" style={{ cursor: "pointer" }}
                    href="http://localhost:3001/authorize/google">
        {"Google"}
      </LinkMaterial>
    </Box>
  );
}