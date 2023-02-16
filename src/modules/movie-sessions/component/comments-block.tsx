import { Avatar, Box, Grid, Typography } from "@mui/material";
import { generateColor } from "@/modules/shared/utils/generate-color";
import { convertStringAvatar } from "@/modules/movie-sessions/utils/convert-string-avatar";
import { CommentsBlockProps } from "@/modules/movie-sessions/type/props";
import { convertDate } from "@/modules/dashboard/shared/utils/date-formater";

export default function CommentsBlock({
  comments,
  currenUserProfileId,
}: CommentsBlockProps) {
  return (
    <Grid container spacing={4}>
      {comments?.map((comment) => (
        <Grid
          key={comment?.id}
          item
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Box
              style={{
                width: "13%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 69,
                  height: 69,
                  bgcolor: generateColor(comment?.userProfileId),
                }}
                children={convertStringAvatar(comment?.userName)}
              />
            </Box>
            <Box
              style={{
                width: "87%",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "-5px 10px 40px 2px rgb(40, 40, 40)",
                borderRadius: "15px",
                padding: "20px",
                backgroundColor:
                  currenUserProfileId === comment?.userProfileId
                    ? "rgb(50, 50, 50)"
                    : "rgb(40, 40, 40)",
              }}
            >
              <Grid
                container
                spacing={1}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <Grid item>
                  <Typography
                    style={{
                      fontSize: "1.625em",
                      fontWeight: "900",
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {comment?.userName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      fontSize: "0.925em",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {convertDate(comment?.createdDate)}
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                  <Typography
                    style={{
                      fontSize: "1em",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {comment?.text}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
