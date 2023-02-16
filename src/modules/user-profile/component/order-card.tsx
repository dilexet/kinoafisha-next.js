import { useState } from "react";
import {
  Box,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Skeleton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { OrderCardProps } from "@/modules/user-profile/types/props";
import { IMAGE_URL } from "@/modules/shared/constants/api-constants";
import CollapsibleReservedSeatsComponent from "@/modules/user-profile/component/collapsible-reserved-seats";

export default function OrderCard({ order }: OrderCardProps) {
  const [open, setOpen] = useState(false);
  const orderIsExpire = moment(order?.startDate).isBefore(new Date());
  return (
    <Box
      style={{
        display: "flex",
        margin: "30px 10px",
        width: "100%",
        opacity: orderIsExpire ? "0.6" : "1",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          {order?.moviePosterURL ? (
            <CardMedia
              component='img'
              style={{
                width: "100px",
                height: "140px",
                borderRadius: "5px",
                opacity: "0.9",
                display: "block",
              }}
              image={IMAGE_URL(order?.moviePosterURL)}
              alt={order?.movieName}
            />
          ) : (
            <Skeleton variant='rectangular' width={100} height={140} />
          )}
        </Grid>
        <Grid item xs={5}>
          <Box
            style={{
              margin: "0 10px",
            }}
          >
            <Typography
              style={{
                fontSize: "1em",
                fontWeight: "700",
                marginBottom: "6px",
                opacity: "0.8",
              }}
            >
              {order?.movieName}
            </Typography>
            <Box
              style={{
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              <Box
                style={{
                  margin: "10px 0",
                  display: "inline-flex",
                  verticalAlign: "top",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    paddingRight: "12px",
                  }}
                >
                  <LocationOnIcon
                    style={{
                      fontSize: "20px",
                      color: "rgba(255, 255, 255, 0.35)",
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      {order?.cinemaName}
                      &nbsp;in&nbsp;
                      {order?.address}
                    </Typography>
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                      style={{
                        color: "rgba(255, 255, 255, 0.35)",
                      }}
                    >
                      &nbsp;/&nbsp;
                    </Typography>
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      {order?.hallName}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box
                style={{
                  margin: "10px 0",
                  display: "inline-flex",
                  verticalAlign: "top",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                  }}
                >
                  <CalendarTodayIcon
                    style={{
                      color: "rgba(255, 255, 255, 0.35)",
                      fontSize: "22px",
                    }}
                  />
                </Box>
                <Box
                  style={{
                    margin: "0 15px",
                  }}
                >
                  <Typography
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      {moment(order?.startDate).format("dddd, MMMM DD")}
                    </Typography>
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      &nbsp;/&nbsp;
                    </Typography>
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      {moment(order?.startDate).format("HH:mm")}
                    </Typography>
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      &nbsp;-&nbsp;
                    </Typography>
                    <Typography
                      component='span'
                      fontSize='14px'
                      fontWeight='400'
                    >
                      {moment(order?.endDate).format("HH:mm")}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            style={{
              height: "100%",
              marginRight: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Typography component='span' fontSize='20px' fontWeight='500'>
                Total price:&nbsp;
              </Typography>
              <Typography component='span' fontSize='20px' fontWeight='700'>
                {order?.totalPrice}
              </Typography>
              <Typography component='span' fontSize='20px' fontWeight='600'>
                &nbsp;$
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box
            style={{
              height: "100%",
              marginRight: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton size='small' onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <CollapsibleReservedSeatsComponent
              open={open}
              reservedSeats={order?.seats}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
