import { Box, IconButton, Modal as MuiModal, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/modal.module.css";

export default function Modal({ openModal, handleCloseModal, children }) {
  const theme = useTheme();
  return (
    <MuiModal
      open={openModal}
      onClose={handleCloseModal}
    >
      <Box className={styles.modal} style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "400px",
        minHeight: "200px",
        background: "rgb(50, 50, 50)",
        // background: "linear-gradient(to right top, rgb(81, 16, 43), rgb(39, 39, 42))",
        color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
        border: "none",
        padding: "20px",
        borderRadius: "22px",
      }}>
        <Box style={{
          display: "flex",
          justifyContent: "right",
        }}>
          <IconButton aria-label="close" onClick={handleCloseModal} style={{
            height: "22px",
            width: "22px",
          }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
}