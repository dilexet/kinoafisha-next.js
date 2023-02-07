import { Theme } from "@mui/material/styles";

export default function getStyles(id: string, ids: readonly string[], theme: Theme) {
  const fontWeight = ids.indexOf(id) === -1
    ? theme.typography.fontWeightRegular
    : theme.typography.fontWeightMedium;
  return {
    fontWeight: fontWeight,
  };
}