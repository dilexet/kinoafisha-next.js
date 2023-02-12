import React, { useEffect, useState } from "react";
import Header from "@/modules/header/component";
import { useAppDispatch, useAppSelector } from "@/modules/shared/redux/hooks";
import { logoutActionAsync } from "@/modules/authorize/action";
import { useRouter } from "next/router";
import { home } from "@/modules/shared/constants/app-routes";
import { getTokens } from "@/modules/authorize/utils/token-service";

const HeaderContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(null);
  const authState = useAppSelector((x) => x.authorize_reducer);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    await dispatch(logoutActionAsync());
    setIsAuthenticate(false);
    if (router.route !== home) {
      await router.push(home);
    }
  };

  useEffect(() => {
    if (authState.loadingStatus || isAuthenticate === null) {
      const tokens = getTokens();
      if (tokens?.accessToken && tokens?.refreshToken) {
        setIsAuthenticate(true);
      } else {
        setIsAuthenticate(false);
      }
    }
  }, [authState.loadingStatus, isAuthenticate]);

  return (
    <Header
      isMenuOpen={isMenuOpen}
      handleLogoutClick={handleLogoutClick}
      anchorEl={anchorEl}
      handleMenuOpen={handleProfileMenuOpen}
      handleMenuClose={handleMenuClose}
      isAuthenticate={isAuthenticate}
    />
  );
};

export default HeaderContainer;
