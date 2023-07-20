import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import { ChildModal, UpdatedModal } from "./Modal";
import { useDispatch } from "react-redux";
import { handleDeletePostState } from "../redux/postSlicer";

function PostHandler(props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setUpdated] = React.useState(false);
  const [postIndex, setPostIndex] = useState(0);
  const dispatch = useDispatch();
  const handleOpen = (post) => {
    setOpen(true);
    setPostIndex(post.id);
  };

  const handleupdate = (post) => {
    setUpdated(true);
    console.log("user Index" + props.index);
    setPostIndex(post.id);
  };

  const handleupdateClose = () => {
    setUpdated(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {props?.post.map((item) => (
        <Card
          key={item.id}
          style={{ marginBottom: "16px", backgroundColor: "#F7F9FC" }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body1" color="gray">
              {item.body}
            </Typography>
          </CardContent>
          <CardActions>
            {parseInt(item.userId) === parseInt(props.activeIndex) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12%",
                }}
              >
                <Button
                  onClick={() =>
                    dispatch(
                      handleDeletePostState({
                        userId: item?.userId,
                        postId: item?.id,
                      })
                    )
                  }
                  style={{ marginLeft: "auto" }}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  style={{ marginLeft: "auto" }}
                  onClick={() => handleOpen(item)}
                >
                  <EditIcon />
                </Button>
              </div>
            )}
            <Button
              style={{ marginLeft: "auto" }}
              onClick={() => handleupdate(item)}
            >
              <CommentIcon />
            </Button>
          </CardActions>
        </Card>
      ))}
      <ChildModal
        open={open}
        handleClose={handleClose}
        userIndex={props.index}
        postIndex={postIndex}
        handleUpdatePost={props.handleUpdatePost}
      />
      <UpdatedModal
        open={openUpdate}
        handleClose={handleupdateClose}
        userIndex={props.index}
        postIndex={postIndex}
        activeIndex={props.activeIndex}
      />
    </>
  );
}

export default React.memo(PostHandler);
