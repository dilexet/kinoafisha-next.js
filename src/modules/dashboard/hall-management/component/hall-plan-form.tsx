import { Grid } from "@mui/material";
import FormTextField from "@/modules/shared/component/form-text-field";
import { Box } from "@mui/system";
import RowNumber from "@/modules/dashboard/hall-management/component/hall-plan/row-number";
import { calculateWidthBySeats } from "@/modules/shared/utils/calculate-width";
import SeatsPlan from "@/modules/dashboard/hall-management/component/hall-plan/seats-plan";
import SeatTypesPlan from "@/modules/dashboard/hall-management/component/hall-plan/seat-types-plan";
import React from "react";

export default function HallPlanForm({
                                       numberOfRows,
                                       handleChangeNumberOfRows,
                                       rows,
                                       numberOfSeats,
                                       handleChangeNumberOfSeats,
                                       selectedSeatType,
                                       handleSelectSeatType,
                                       handleSeatClick,
                                       handleChangeSeatTypePrices,
                                       seatTypePrices, maxWidth, seatTypeState,
                                     }) {

  return (
    <>
      <Grid item>
        <FormTextField
          id="numberOfRows"
          type="number"
          label="Number of rows"
          name="numberOfRows"
          error={numberOfRows <= 0}
          value={numberOfRows}
          variant="outlined"
          margin="normal"
          outlinedInputStyle={{ borderRadius: "20px" }}
          onChange={handleChangeNumberOfRows}
          formControlStyle={{ width: "350px" }}
        />
      </Grid>
      {
        rows?.length > 0 ?
          rows?.map((row, index) => (
            <Grid item key={index}>
              <FormTextField
                id="numberOfSeats"
                type="number"
                label={`Number of seats for ${index + 1} row`}
                name="numberOfSeats"
                value={numberOfSeats[index]}
                error={numberOfSeats[index] <= 0}
                variant="outlined"
                margin="normal"
                outlinedInputStyle={{ borderRadius: "20px" }}
                onChange={(e) => handleChangeNumberOfSeats(e, index)}
                formControlStyle={{ width: "350px" }}
              />
            </Grid>
          ))
          : <></>
      }
      <Grid item>
        {
          rows?.length > 0 ?
            <SeatTypesPlan selectedSeatType={selectedSeatType} handleSelectSeatType={handleSelectSeatType} /> :
            <></>
        }
      </Grid>
      <Grid item style={{
        width: "100%",
      }}>
        <Box style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "100%",
        }}>
          {
            rows?.length > 0 ?
              rows.map((row) => (
                row?.seats?.length > 0 ?
                  <Grid key={row.numberRow}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                          display: "flex",
                          width: calculateWidthBySeats(row?.seats?.length),
                          maxWidth: `${maxWidth * 0.8}px`,
                          margin: "20px 0",
                        }}
                  >
                    <RowNumber row={row} />
                    <SeatsPlan row={row} handleSeatClick={handleSeatClick} selectedSeatType={selectedSeatType} />
                    <RowNumber row={row} />
                  </Grid>
                  : <React.Fragment key={row.numberRow} />
              )) : <></>
          }
        </Box>
      </Grid>
      <Grid item>
        <Box>
          {
            seatTypePrices?.length > 0 ?
              seatTypePrices?.map((seatTypePrice, index) => (
                <Grid item key={index}>
                  <FormTextField
                    id="seatTypePrice"
                    type="number"
                    label={`Price $ for ${seatTypeState?.seatTypes?.find(x => x.id === seatTypePrice?.seatTypeId).name} seat`}
                    name="seatTypePrice"
                    value={seatTypePrice.price}
                    error={seatTypePrice.price <= 0}
                    variant="outlined"
                    margin="normal"
                    outlinedInputStyle={{ borderRadius: "20px" }}
                    onChange={(e) => handleChangeSeatTypePrices(e, seatTypePrice?.seatTypeId)}
                    formControlStyle={{ width: "350px" }}
                  />
                </Grid>
              ))
              : <></>
          }
        </Box>
      </Grid>
    </>
  );
}



