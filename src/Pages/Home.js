import React, { useEffect, useState, useCallback } from "react";
import { Box, FormControlLabel, Switch, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PostHandler from "../Components/PostHandler";
import PostForm from "../Components/PostForm";
import "./Home.css";
import Navbar from "../Components/Navbar";
import { useSelector,useDispatch } from "react-redux";
import {handleAddPostState} from "../redux/postSlicer";

function PostManager() {
  const [userIndex, setIndex] = useState(0);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [view, setView] = useState(false);
  const [allData, setAllData] = useState([]);
  const dispatch=useDispatch()
  const userindex=useSelector((state)=>state.postHandler.users)
  let alLUsers=useSelector((state)=>state.postHandler.allData)
  useEffect(() => {
    setAllData([...alLUsers]);
    setIndex(userindex);
  }, [alLUsers]);


  const handleAddPost = useCallback( ()=> {
    if (newPostTitle.trim() !== "" && newPostContent.trim() !== "") {
      dispatch(handleAddPostState({userId:userIndex,newPostTitle,newPostContent}))
      alert("Post added successfully");
    }
  });

  const handleToggle = (event) => {
    setView(event.target.checked);
  };

  return (
    <>
    <Navbar/>

   

<div style={{ width: "600px", margin: "0 auto", padding: 16 }}>
  <Typography variant="h4" align="center" gutterBottom>
    Hello, {allData[userIndex - 1]?.name}
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
  <Box display="flex" justifyContent="center" alignItems="center"  marginBottom={8}>
    <FormControlLabel
      control={<Switch checked={view} onChange={handleToggle} color="primary" size="large" />}
      label="View All Posts"
    />
  </Box>

  {allData.length > 0 ? (
    <Box display="flex" flexDirection="column" alignItems="center">
      {allData.map((post) => {
        if ((view === false && post.userId === parseInt(userIndex)) || view === true) {
          return (
            <PostHandler
              key={post.userId}
              post={post.posts}
              index={post.userId}
              activeIndex={userindex}
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
