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
import { APP_LOGO } from "@/modules/shared/constants/app-constants";
import { HeaderComponentProps } from "@/modules/header/type/header-component-props";
import styles from "@/styles/header.module.css";

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
                component="h1"
                style={{
                  textDecoration: "none",
                  textTransform: "none",
                  opacity: "0.9",
                  marginRight: "10px",
                  fontSize: "1.625em",
                  fontWeight: "900",
                }}
              >
                <span className={styles.logo_start}>
                  {APP_LOGO.start}
                </span>
                <span className={styles.logo_end}>
                  {APP_LOGO.end}
                </span>
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