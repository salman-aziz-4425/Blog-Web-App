import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, Switch } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PostHandler from "../Components/PostHandler";
import PostForm from "../Components/PostForm";
import Navbar from "../Components/Navbar";
import { handleAddPostState } from "../redux/postSlicer";

function PostManager() {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [view, setView] = useState(false);
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const userDatabaseID = useSelector((state) => state.postHandler.userID);
  let allUsers = useSelector((state) => state.postHandler.allUsersData);

  useEffect(() => {
    setAllData([...allUsers]);
  }, [allUsers]);

  const handleAddPost = () => {
    if (newPostTitle.trim() !== "" && newPostContent.trim() !== "") {
      dispatch(
        handleAddPostState({
          userId: userDatabaseID,
          newPostTitle,
          newPostContent,
        })
      );
      alert("Post added successfully");
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleToggle = (event) => {
    setView(event.target.checked);
  };

  return (
    <>
      <Navbar />

      <div style={{ width: "600px", margin: "0 auto", padding: 16 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Hello, {allData[userDatabaseID - 1]?.name}
        </Typography>
        <Box marginBottom={16}>
          <PostForm
            newPostTitle={newPostTitle}
            newPostContent={newPostContent}
            onNewPostTitleChange={setNewPostTitle}
            onNewPostContentChange={setNewPostContent}
            onAddPost={handleAddPost}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={8}
        >
          <FormControlLabel
            control={
              <Switch
                checked={view}
                onChange={handleToggle}
                color="primary"
                size="large"
              />
            }
            label="View All Posts"
          />
        </Box>

        {allData.length > 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            {allData.map((post) => {
              if (
                (view === false && post.userId === parseInt(userDatabaseID)) ||
                view === true
              ) {
                return (
                  <PostHandler
                    key={post.userId}
                    post={post.posts}
                    index={post.userId}
                    activeIndex={userDatabaseID}
                  />
                );
              }
              return null;
            })}
          </Box>
        ) : (
          <Typography variant="body1" align="center">
            No posts yet.
          </Typography>
        )}
      </div>
    </>
  );
}

export default PostManager;
