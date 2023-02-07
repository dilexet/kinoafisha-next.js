import { useState } from "react";
import DashboardDrawer from "@/modules/dashboard/shared/component/dashboard-drawer";

export default function DashboardDrawerContainer() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return <DashboardDrawer open={open} toggleDrawer={toggleDrawer} />;
}
