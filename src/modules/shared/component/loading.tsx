import { BallTriangle } from "react-loader-spinner";
import { Box, Backdrop } from "@mui/material";

export default function Loading() {
  return (
    <Box marginLeft='auto' marginRight='auto'>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <BallTriangle color='#00BFFF' height={80} width={80} />
      </Backdrop>
    </Box>
  );
}
