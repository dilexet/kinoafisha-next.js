import { Box, Container } from "@mui/material";
import DashboardDrawerContainer from "@/modules/dashboard/shared/container/dashboard-drawer-container";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardDrawerContainer />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          minHeight: "100vh",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
