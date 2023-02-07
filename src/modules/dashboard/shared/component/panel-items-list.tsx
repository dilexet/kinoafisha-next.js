import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import Link from "next/link";
import styled from "@/styles/drawer-panel.module.css";
import { useRouter } from "next/router";
import { PanelItems } from "@/modules/dashboard/shared/constants/panel-items";

export default function PanelItemsList() {
  const router = useRouter();

  return (
    <List>
      <ListSubheader inset>Admin panel</ListSubheader>
      {
        PanelItems.map((item, index) => (
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