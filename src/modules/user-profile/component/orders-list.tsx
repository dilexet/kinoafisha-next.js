import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { OrdersListComponentProps } from "@/modules/user-profile/types/props";
import OrderCard from "@/modules/user-profile/component/order-card";
import OrdersEmptyComponent from "@/modules/user-profile/component/orders-empty";

export default function OrdersListComponent({ orders }: OrdersListComponentProps) {
  return (
    <Box style={{
      marginTop: "60px",
      width: "100%",
    }}>
      <Box style={{
        display: "flex",
        textAlign: "left",
        justifyContent: "space-between",
      }}>
        <Typography component="h2" style={{
          opacity: "0.8",
          paddingBottom: "18px",
          fontSize: "2.25em",
          fontWeight: "700",
          margin: 0,
        }}>
          My tickets
        </Typography>
      </Box>
      {
        orders?.length > 0 ?
          <React.Fragment>
            <Divider />
            {
              orders?.map((order, index) => (
                <Box key={index}>
                  <OrderCard order={order} />
                  <Divider />
                </Box>
              ))
            }
          </React.Fragment> :
          <OrdersEmptyComponent />
      }
    </Box>
  );
}