import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableContainer,
  Typography,
  useTheme,
  Skeleton,
  Stack,
} from "@mui/material";
import SearchInputContainer from "@/modules/dashboard/shared/container/search-input-container";
import { ModalActionTypes } from "@/modules/shared/constants/modal-action-types";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React from "react";
import { TableManagementContainerProps } from "@/modules/dashboard/shared/types/table-management-container-props";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { generateEmptyArray } from "@/modules/shared/utils/generate-empty-array";
import styles from "@/styles/table.module.css";

export default function TableManagementComponent({
                                                   title,
                                                   loadData,
                                                   handleOpenModal,
                                                   loadingStatus,
                                                   errorMessage,
                                                   TableHead,
                                                   TableBody,
                                                 }: TableManagementContainerProps) {
  const theme = useTheme();
  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="lg">
      <Grid item>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                component="h2"
                variant="h6"
                color="secondary"
                style={{
                  textAlign: "left",
                  float: "left",
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box>
              <SearchInputContainer loadData={loadData} />
            </Box>
            <Box>
              <Button
                size="small"
                aria-label="create"
                variant="outlined"
                onClick={() => handleOpenModal(ModalActionTypes.CREATE)}
                style={{
                  color: theme.palette.grey["200"],
                  borderColor: theme.palette.success.dark,
                  borderRadius: "11px",
                  padding: "7px 14px",
                }}
                startIcon={
                  <AddBoxIcon style={{ fill: theme.palette.success.dark }} />
                }
              >
                Create
              </Button>
            </Box>
          </Box>
          <Box
            style={{
              width: "100%",
              margin: "15px 0",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="secondary"
              style={{
                textAlign: "center",
              }}
              fontStyle={{ color: theme.palette.error.dark }}
            >
              {typeof errorMessage === "string" && errorMessage
                ? errorMessage
                : ""}
            </Typography>
          </Box>
          {
            loadingStatus !== LOADING_STATUSES.PENDING &&
            loadingStatus !== LOADING_STATUSES.LOADING ?
              <TableContainer className={styles.table}>
                <Table width="auto" aria-label="a dense table">
                  {TableHead}
                  {TableBody}
                </Table>
              </TableContainer> :
              <TableSkeleton />
          }

        </Paper>
      </Grid>
    </Container>
  );
}

export function TableSkeleton() {
  return (
    <Stack spacing={1} style={{
      display: "flex",
      alignItems: "space-between",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "16px",
    }}>
      <Skeleton variant="rectangular" height={30} />
      {
        generateEmptyArray(10, 0)?.map((value, index) => (
          <Skeleton variant="rectangular" height={65} key={index} />
        ))
      }
    </Stack>
  );
}