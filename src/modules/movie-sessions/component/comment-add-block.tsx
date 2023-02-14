import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { generateColor } from "@/modules/shared/utils/generate-color";
import { convertStringAvatar } from "@/modules/movie-sessions/utils/convert-string-avatar";
import SendIcon from "@mui/icons-material/Send";
import { CommentAddBlockProps } from "@/modules/movie-sessions/type/props";

export default function CommentAddBlock({
                                          user,
                                          handleAddComment,
                                          handleCommentTextChange,
                                          commentText,
                                        }: CommentAddBlockProps) {
  return (
    <Box style={{
      width: "100%",
      margin: "50px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Box style={{
        width: "87%",
        maxWidth: "960px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "-5px 10px 40px 2px rgb(40, 40, 40)",
        borderRadius: "15px",
        backgroundColor: "rgb(45, 45, 45)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "20px 0px 20px 10px",
      }}>
        <Box style={{
          width: "15%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <Avatar
            sx={{
              width: 69, height: 69,
              bgcolor: generateColor(user?.userProfileId),
            }}
            children={convertStringAvatar(user?.name)}
          />
        </Box>
        <Box style={{
          width: "75%",
        }}>
          <Grid container flexDirection="column" spacing={4}>
            <Grid item>
              <Typography style={{
                fontSize: "1.5em",
                fontWeight: "800",
                color: "rgba(255, 255, 255, 0.8)",
              }}>
                Add comment
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="comment-text"
                placeholder="What do you think about this movie?"
                multiline
                rows={4}
                maxRows={6}
                fullWidth
                value={commentText}
                onChange={handleCommentTextChange}
              />
            </Grid>
            <Grid item style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddComment}
                endIcon={<SendIcon />}
                style={{
                  backgroundColor: "#DE3163",
                  color: "rgb(255, 255, 255, 0.8)",
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}