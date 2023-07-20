import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userID: 0,
  allUsersData: [],
};

export const postSlice = createSlice({
  name: "postHandler",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.userID = action.payload;
    },
    addAllData: (state, action) => {
      state.allUsersData= [...action.payload];
    },
    handleAddPostState: (state, action) => {
      const { userId, newPostTitle, newPostContent } = action.payload;

      if (newPostTitle.trim() !== "" && newPostContent.trim() !== "") {
        let newPost = {};
        if (state.allUsersData[userId - 1].posts.length === 0) {
          newPost = {
            userId: parseInt(userId),
            id: 1,
            title: newPostTitle,
            body: newPostContent,
            comments: [],
          };
        } else {
          newPost = {
            userId: parseInt(userId),
            id:state.allUsersData[userId - 1].posts[state.allUsersData[userId - 1].posts.length - 1].id + 1,
            title: newPostTitle,
            body: newPostContent,
            comments: [],
          };
        }
        const updatedPosts = [...state.allUsersData];
        updatedPosts[userId - 1].posts.unshift(newPost);
        state.allUsersData= updatedPosts;
        localStorage.setItem("usersData", JSON.stringify(updatedPosts));
      }
    },
    handleDeletePostState: (state, action) => {
      const { userId, postId } = action.payload;
      let updatedPosts = state.allUsersData.slice();
      state.allUsersData[userId - 1].posts = updatedPosts[userId - 1].posts.filter(
        (post) => {
          return post.id !== postId;
        }
      );
      localStorage.setItem("usersData", JSON.stringify(state.allUsersData));
    },
    handleUpdatePostState: (state, action) => {
      const updatedPosts = [...state.allUsersData];
      let postPostion = updatedPosts[
        action.payload.userIndex - 1
      ]?.posts.findIndex((item) => item?.id === action.payload.postIndex);
      let post = updatedPosts[action.payload.userIndex - 1].posts[postPostion];
      if (action.payload.postName.trim() !== "") {
        post.title = action.payload.postName;
      }
      if (action.payload.postContent.trim() !== "") {
        post.body = action.payload.postContent;
      }
      updatedPosts[action.payload.userIndex - 1].posts[postPostion] = post;
      localStorage.setItem("usersData", JSON.stringify(updatedPosts));
      alert("Post Updated Successfully");
    },
  },
});

export const {
  addUsers,
  addAllData,
  handleDeletePostState,
  handleUpdatePostState,
  handleAddPostState,
  handlePostCommentState,
} = postSlice.actions;

export default postSlice.reducer;