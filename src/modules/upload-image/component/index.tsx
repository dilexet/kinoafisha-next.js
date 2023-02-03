import { IconButton, Stack, styled } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Input = styled("input")({
  display: "none",
});


export default function UploadImage({ handleUploadImage }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept=".jpg, .jpeg, .png"
          id="contained-button-file"
          type="file"
          onChange={handleUploadImage}
        />
        <IconButton color="primary" aria-label="upload picture" component="span"
                    style={{
                      margin: "10px 10px",
                      border: "1px solid",
                      borderRadius: "11px",
                    }}>
          <FileUploadIcon />
        </IconButton>
      </label>
    </Stack>
  );
}