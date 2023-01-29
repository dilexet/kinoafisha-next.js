import Link from "next/link";
import { Typography, Link as LinkMaterial, Box } from "@mui/material";
import { APP_NAME } from "@/shared/constants/app-constants";

const Copyright = () => {
  return (
    <Box style={{ marginTop: "20px" }}>
      <Typography style={{ textAlign: "center" }} color="text.secondary">
        {"Copyright © "}
        <LinkMaterial
          color="inherit"
          component={Link}
          href="/"
          style={{ textDecoration: "none", borderBottom: '1px solid' }}>
          {APP_NAME}
        </LinkMaterial>
        {" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
