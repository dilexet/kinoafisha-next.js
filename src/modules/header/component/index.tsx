import Link from "next/link";
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  Box,
  Link as LinkMaterial,
  ButtonGroup,
  Grid,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { APP_NAME } from "@/modules/shared/constants/app-constants";
import { HeaderComponentProps } from "@/modules/header/type/header-component-props";

const Header = ({ theme, onChangeTheme, isDarkModeEnabled }: HeaderComponentProps) => {
  return (
    <Box component="header">
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            style={{
              width: "25%",
            }}
          >
            <Link href="/" style={{
              textDecoration: "none",
            }}>
              <Typography
                variant="h6"
                style={{
                  color: theme.palette.text.secondary,
                  textDecoration: "none",
                  textTransform: "none",
                  opacity: "0.9",
                  fontSize: "1.2em",
                  fontWeight: "600",
                  marginRight: "10px",
                }}
              >
                {APP_NAME}
              </Typography>
            </Link>
          </Box>
          <Box
            style={{
              width: "75%",
            }}
          >
            <Grid
              container
              columnSpacing={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Grid item>
                <LinkMaterial sx={{ my: 1, mx: 1.5 }}
                              variant="button"
                              component={Link} href="/afisha"
                              style={{
                                color: theme.palette.text.secondary,
                                textDecoration: "none",
                                marginLeft: "20px",
                                opacity: "0.9",
                                fontSize: "1em",
                                fontWeight: "400",
                                textTransform: "none",
                              }}>
                  Afisha
                </LinkMaterial>
              </Grid>
              <Grid item>
                <ButtonGroup size="medium">
                  <IconButton onClick={() => onChangeTheme(!isDarkModeEnabled)}
                              color="inherit">
                    {isDarkModeEnabled ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;