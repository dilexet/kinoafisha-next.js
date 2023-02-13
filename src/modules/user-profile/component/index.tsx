import { TabContext, TabPanel } from "@mui/lab";
import {
  Box,
  Divider,
  Paper,
  Tab, Tabs,
  Typography,
} from "@mui/material";
import { UserProfileComponentProps } from "@/modules/user-profile/types/props";
import OrdersListComponent from "@/modules/user-profile/component/orders-list";
import { TabsValue } from "@/modules/user-profile/constants/tabs";
import ProfileContainer from "@/modules/user-profile/container/profile";

export default function UserProfileComponent({ profileState, handleChange, tabsValue }: UserProfileComponentProps) {
  return (
    <Box style={{
      margin: "16px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Box style={{ width: "90%" }}>
        <Paper sx={{ p: 2 }} style={{
          background: "#27272A",
          border: "none",
          boxShadow: "none",
        }}>
          <TabContext value={tabsValue}>
            <Box style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "0 30px",
            }}>
              {
                tabsValue === TabsValue.tickets ?
                  <Typography component="h1" style={{
                    fontSize: "3.125em",
                    fontWeight: "700",
                    margin: "0",
                  }}>
                    Ticket purchase history
                  </Typography> :
                  <Typography component="h1" style={{
                    fontSize: "3.125em",
                    fontWeight: "700",
                    margin: "0",
                  }}>
                    Profile settings
                  </Typography>
              }
              <Box style={{
                flex: "0 0 auto",
              }}>
                <Tabs
                  value={tabsValue}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example">
                  <Tab value={TabsValue.tickets} label="Tickets" />
                  <Tab value={TabsValue.userProfile} label="Profile" />
                </Tabs>
              </Box>
            </Box>
            <Box style={{
              margin: "0 auto 90px auto",
              padding: "30px",
            }}>
              <Divider />
              <Box>
                <TabPanel value={TabsValue.tickets}>
                  <OrdersListComponent orders={profileState?.profile?.orders} />
                </TabPanel>
                <TabPanel value={TabsValue.userProfile}>
                  <ProfileContainer />
                </TabPanel>
              </Box>
            </Box>
          </TabContext>
        </Paper>
      </Box>
    </Box>
  );
}