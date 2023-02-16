import { Box, Skeleton, Stack } from "@mui/material";

export default function MovieCardSkeleton() {
  return (
    <Stack
      spacing={1}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        boxShadow: "none",
        margin: "10px 0",
        minHeight: "725px",
      }}
    >
      <Skeleton variant='rounded' width={240} height={360} />
      <Box
        style={{
          width: "98%",
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          flexDirection: "column",
          margin: "60px 0",
        }}
      >
        <Skeleton variant='rounded' width={80} height={40} />
        <Skeleton variant='text' width={200} height={40} />
        <Skeleton variant='rounded' width={80} height={40} />
      </Box>
      <Box>
        <Skeleton variant='rounded' width={150} height={50} />
      </Box>
    </Stack>
  );
}
