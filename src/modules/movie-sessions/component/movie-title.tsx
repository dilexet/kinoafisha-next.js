import { Box, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import Timer from "@/modules/booking/component/timer";

export default function MovieTitleComponent({
  movieName,
  handleClose,
  minutes = 0,
  seconds = 0,
  isRunning = false,
}) {
  return (
    <Box
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "100",
        boxShadow: "none",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          margin: "0 auto 15px",
          boxSizing: "border-box",
          position: "relative",
          background: "rgba(39, 39, 42, 0.9)",
        }}
      >
        <Box style={{ boxSizing: "border-box" }}>
          <IconButton
            aria-label='Back'
            onClick={handleClose}
            style={{
              display: "inline-block",
              verticalAlign: "top",
              color: "rgba(255, 255, 255, 0.35)",
            }}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Box>
        <Box
          style={{
            padding: "0 15px",
            margin: "0 auto",
            flex: "1 1 auto",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.35)",
              fontWeight: "700",
              fontSize: "1.125em",
            }}
          >
            {movieName}
          </Typography>
          {isRunning === true ? (
            <Box>
              <Timer minutes={minutes} seconds={seconds} />
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <Box style={{ boxSizing: "border-box" }}>
          <IconButton
            aria-label='Back'
            onClick={handleClose}
            style={{
              display: "inline-block",
              verticalAlign: "top",
              color: "rgba(255, 255, 255, 0.35)",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
