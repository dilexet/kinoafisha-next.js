import { ListItemIcon, MenuItem, Menu } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Link from "next/link";
import { authorize, user_profile } from "@/modules/shared/constants/app-routes";

export default function AccountMenu({
                                      isMenuOpen, handleLogoutClick,
                                      handleMenuClose, anchorEl, isAuthenticate,
                                    }) {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: "\"\"",
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      open={isMenuOpen}
      onClick={handleMenuClose}
      onClose={handleMenuClose}
    >
      {
        isAuthenticate === true ?
          <div>
            <MenuItem color="inherit" style={{ textDecoration: "none" }}
                      component={Link} href={user_profile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem color="inherit" style={{ textDecoration: "none" }}
                      onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div> :
          <div>
            <MenuItem color="inherit" style={{ textDecoration: "none" }}
                      component={Link} href={authorize.Login}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              Sign in
            </MenuItem>
            <MenuItem color="inherit" style={{ textDecoration: "none" }}
                      component={Link} href={authorize.Register}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Sign up
            </MenuItem>
          </div>
      }
    </Menu>
  );
}