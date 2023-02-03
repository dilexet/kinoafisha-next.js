import { Drawer } from "@/modules/dashboard/shared/styles/drawer";
import { Divider, IconButton, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PanelItemsList from "@/modules/dashboard/shared/component/panel-items-list";

export default function DashboardDrawer({ open, toggleDrawer }) {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {
            open ?
              <ChevronLeftIcon />
              : <ChevronRightIcon />
          }
        </IconButton>
      </Toolbar>
      <Divider />
      <PanelItemsList />
    </Drawer>
  );
}