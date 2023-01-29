import { Box, Typography, useTheme } from "@mui/material";
import styles from "@/styles/404.module.css";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box className={styles.notfound_main_box}>
      <Box className={styles.notfound_box}>
        <Box className={styles.notfound_info_box}>
          <Typography component="h3"
                      className={theme.palette.mode === "dark" ?
                        styles.notfound_title_color_light :
                        styles.notfound_title_color_dark}>
            Oops! Page not found
          </Typography>
          <Typography component="h1" className={styles.notfound_title_color}>
            <span
              className={theme.palette.mode === "dark" ?
                styles.notfound_text_shadow_light :
                styles.notfound_text_shadow_dark}>
              4
            </span>
            <span
              className={theme.palette.mode === "dark" ?
                styles.notfound_text_shadow_light :
                styles.notfound_text_shadow_dark}>
              0
            </span>
            <span
              className={theme.palette.mode === "dark" ?
                styles.notfound_text_shadow_light :
                styles.notfound_text_shadow_dark}>
              4
            </span>
          </Typography>
        </Box>
        <Typography component="h2"
                    className={theme.palette.mode === "dark" ?
                      styles.notfound_description_color_light :
                      styles.notfound_description_color_dark}>
          we are sorry, but the page you requested was not found
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
