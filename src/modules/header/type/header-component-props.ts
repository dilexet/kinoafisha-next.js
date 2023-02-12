export type HeaderComponentProps = {
  isMenuOpen: boolean;
  handleLogoutClick: () => void;
  handleMenuClose: () => void;
  handleMenuOpen: (event: any) => void;
  anchorEl: any;
  isAuthenticate: boolean | null
};