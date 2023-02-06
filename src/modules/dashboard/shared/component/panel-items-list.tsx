import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import Link from "next/link";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import WeekendIcon from "@mui/icons-material/Weekend";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import styled from "@/styles/drawer-panel.module.css";
import { useRouter } from "next/router";

export default function PanelItemsList() {
  const panelItem = [
    {
      name: "User management",
      href: "/dashboard/users",
      icon: <ManageAccountsIcon />,
    },
    {
      name: "Movie management",
      href: "/dashboard/movies",
      icon: <MovieCreationIcon />,
    },
    {
      name: "Cinema management",
      href: "/dashboard/cinemas",
      icon: <TvIcon />,
    },
    {
      name: "Hall management",
      href: "/dashboard/halls",
      icon: <WeekendIcon />,
    },
    {
      name: "Session management",
      href: "/dashboard/sessions",
      icon: <SmartDisplayIcon />,
    },
  ];

  const router = useRouter();

  return (
    <List>
      <ListSubheader inset>Admin panel</ListSubheader>
      {
        panelItem.map((item, index) => (
          <ListItem
            key={index}
            className={
              router.route === item.href ?
                styled.panel_item_list_selected :
                styled.panel_item_list
            }
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            component={Link} href={item.href}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))
      }
    </List>
  );
}