import Link from "next/link";
import {
  Toolbar,
  Typography,
  AppBar,
  Box,
  Link as LinkMaterial,
  ButtonGroup,
  Grid,
  IconButton,
} from "@mui/material";
import { APP_LOGO } from "@/modules/shared/constants/app-constants";
import { HeaderComponentProps } from "@/modules/header/type/header-component-props";
import styles from "@/styles/header.module.css";
import { afisha } from "@/modules/shared/constants/app-routes";
import { AccountCircle } from "@mui/icons-material";
import AccountMenu from "@/modules/header/component/account-menu";

const Header = ({
  isMenuOpen,
  handleLogoutClick,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
  isAuthenticate,
}: HeaderComponentProps) => {
  return (
    <Box component='header'>
      <AppBar
        position='static'
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.palette.background.default,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            style={{
              width: "25%",
            }}
          >
            <Link
              href='/'
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                component='h1'
                style={{
                  textDecoration: "none",
                  textTransform: "none",
                  opacity: "0.9",
                  marginRight: "10px",
                  fontSize: "1.625em",
                  fontWeight: "900",
                }}
              >
                <span className={styles.logo_start}>{APP_LOGO.start}</span>
                <span className={styles.logo_end}>{APP_LOGO.end}</span>
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
                <LinkMaterial
                  sx={{ my: 1, mx: 1.5 }}
                  variant='button'
                  component={Link}
                  href={afisha}
                  color='secondary'
                  style={{
                    textDecoration: "none",
                    marginLeft: "20px",
                    opacity: "0.9",
                    fontSize: "1em",
                    fontWeight: "400",
                    textTransform: "none",
                  }}
                >
                  Afisha
                </LinkMaterial>
              </Grid>
              <Grid item>
                <ButtonGroup size='medium'>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-controls='account-menu'
                    aria-haspopup='true'
                    onClick={handleMenuOpen}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <AccountMenu
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
        isAuthenticate={isAuthenticate}
        handleLogoutClick={handleLogoutClick}
      />
    </Box>
  );
};

export default Header;
