import { Box, Typography, useTheme } from "@mui/material";
import styles from "@/styles/404.module.css";
import Head from "next/head";

const NotFound = () => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Forbidden :(</title>
      </Head>
      <main>
        <Box className={styles.notfound_main_box}>
          <Box className={styles.notfound_box}>
            <Box className={styles.notfound_info_box}>
              <Typography
                component='h3'
                className={
                  theme.palette.mode === "dark"
                    ? styles.notfound_title_color_light
                    : styles.notfound_title_color_dark
                }
              >
                Oops! You do not have access
              </Typography>
              <Typography
                component='h1'
                className={styles.notfound_title_color}
              >
                <span
                  className={
                    theme.palette.mode === "dark"
                      ? styles.notfound_text_shadow_light
                      : styles.notfound_text_shadow_dark
                  }
                >
                  4
                </span>
                <span
                  className={
                    theme.palette.mode === "dark"
                      ? styles.notfound_text_shadow_light
                      : styles.notfound_text_shadow_dark
                  }
                >
                  0
                </span>
                <span
                  className={
                    theme.palette.mode === "dark"
                      ? styles.notfound_text_shadow_light
                      : styles.notfound_text_shadow_dark
                  }
                >
                  3
                </span>
              </Typography>
            </Box>
            <Typography
              component='h2'
              className={
                theme.palette.mode === "dark"
                  ? styles.notfound_description_color_light
                  : styles.notfound_description_color_dark
              }
            >
              we are sorry, but you did not have access to the requested page
            </Typography>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default NotFound;
