import { Skeleton, Stack } from "@mui/material";

export default function CinemaSkeleton() {
  return (
    <Stack spacing={2}>
      {
        [1, 2, 3, 4, 5].map((value) => (
          <Skeleton key={value} variant="rounded" width={360} height="1.625em" />
        ))
      }
    </Stack>
  );
}