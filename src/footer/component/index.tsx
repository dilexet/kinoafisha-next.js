import { Box, Container, Link as LinkMaterial, Typography, useTheme } from "@mui/material";
import { APP_NAME, APP_DESCRIPTION, APP_MAIL } from "@/shared/constants/app-constants";
import Copyright from "./copyright";
import Link from "next/link";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" gutterBottom>
          {APP_NAME}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {APP_DESCRIPTION}
          <LinkMaterial
            color="inherit"
            component={Link}
            href={`mailto: ${APP_MAIL}`}
            style={{ textDecoration: "none", borderBottom: "1px solid" }}>
            {APP_MAIL}
          </LinkMaterial>
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
