import React from 'react'
import { Button,TextField} from '@material-ui/core';

export default function PostForm({
  newPostTitle,
  newPostContent,
  onNewPostTitleChange,
  onNewPostContentChange,
  onAddPost,
}){
  return (
    <>
      <TextField
        label="Post Title"
        variant="outlined"
        value={newPostTitle}
        onChange={(e) => onNewPostTitleChange(e.target.value)}
        style={{ marginBottom: 8 }}
        fullWidth
        color="secondary"
      />
      <TextField
        label="Post Content"
        variant="outlined"
        value={newPostContent}
        onChange={(e) => onNewPostContentChange(e.target.value)}
        style={{ marginBottom:12 }}
        fullWidth
        multiline={true}
        color="secondary"
      />
      <Button variant="contained" color="primary" onClick={onAddPost}>
        Add Post
      </Button>
    </>
  );
};





