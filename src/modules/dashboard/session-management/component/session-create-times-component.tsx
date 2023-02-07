import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormTextField from "@/modules/shared/component/form-text-field";

export default function SessionCreateTimesComponent({
                                                      handleAddNumberOfSessions,
                                                      handleRemoveNumberOfSessions,
                                                      sessionTimes,
                                                      errors,
                                                      handleChangeDate,
                                                      handleChangeCoefficient,
                                                    }) {
  return (
    <Box style={{ maxWidth: "350px" }}>
      <Box style={{
        display: "flex",
        alignItems: "center",
      }}>
        <Box style={{
          display: "flex",
          marginRight: "55px",
        }}>
          <Typography style={{ opacity: "0.7" }}>
            Add or remove session times:
          </Typography>
        </Box>
        <Box style={{
          display: "flex",
        }}>
          <ButtonGroup>
            <IconButton
              aria-label="add"
              onClick={handleAddNumberOfSessions}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="clear"
              onClick={handleRemoveNumberOfSessions}
            >
              <RemoveIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Box>
      <Box>
        {
          sessionTimes?.map((value, index) => (
            <Box key={index}>
              <FormTextField
                id="startDate"
                type="datetime-local"
                label="Start date"
                name="startDate"
                value={value?.startDate}
                error={errors?.sessionTimes ? errors?.sessionTimes[index]?.startDate : ""}
                helperText={errors?.sessionTimes ? errors?.sessionTimes[index]?.startDate : ""}
                variant="outlined"
                margin="normal"
                outlinedInputStyle={{ borderRadius: "20px" }}
                onChange={(e) => handleChangeDate(e, index)}
                formControlStyle={{ width: "350px" }}
              />
              <FormTextField
                id="coefficient"
                type="number"
                label="Coefficient"
                name="coefficient"
                value={value?.coefficient}
                error={errors?.sessionTimes ? errors?.sessionTimes[index]?.coefficient : ""}
                helperText={errors?.sessionTimes ? errors?.sessionTimes[index]?.coefficient : ""}
                variant="outlined"
                margin="normal"
                outlinedInputStyle={{ borderRadius: "20px" }}
                onChange={(e) => handleChangeCoefficient(e, index)}
                formControlStyle={{ width: "350px" }}
              />
            </Box>
          ))
        }
      </Box>
    </Box>
  );
}