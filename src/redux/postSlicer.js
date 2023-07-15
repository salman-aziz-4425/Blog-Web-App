import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users:0, 
  allData:[]
};

export const postSlice = createSlice({
  name: 'postHandler',
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addAllData: (state, action) => {
      state.allData = [...action.payload];
    },
    handleAddPostState: (state, action) => {
      const { userId, newPostTitle, newPostContent } = action.payload;
      if (newPostTitle.trim() !== "" && newPostContent.trim() !== "") {
        let newPost = {
          userId: parseInt(userId),
          id: state.allData[userId - 1].posts[state.allData[userId - 1].posts.length - 1].id + 1,
          title: newPostTitle,
          body: newPostContent,
          comments: [],
        };
        const updatedPosts = [...state.allData];
        updatedPosts[userId - 1].posts.unshift(newPost);
        state.allData = updatedPosts;
        localStorage.setItem('usersData',JSON.stringify(updatedPosts))
      }
    },
    handleDeletePostState: (state, action) => {
      const { userId, postId } = action.payload;
      let updatedPosts = state.allData.slice();
      state.allData[userId - 1].posts = updatedPosts[userId - 1].posts.filter((post)=>{
        return post.id !== postId
      })
      localStorage.setItem('usersData',JSON.stringify(state.allData))
    },
  handleUpdatePostState: (state, action) => {
    const updatedPosts = [...state.allData];
    let postPostion=updatedPosts[action.payload.userIndex-1]?.posts.findIndex((item)=>item?.id===action.payload.postIndex)
    let post=updatedPosts[action.payload.userIndex-1].posts[postPostion]
    if(action.payload.postName.trim()!==""){
      post.title=action.payload.postName
    }
    if(action.payload.postContent.trim()!==""){
      post.body=action.payload.postContent
    }
    updatedPosts[action.payload.userIndex-1].posts[postPostion]=post
    localStorage.setItem('usersData',JSON.stringify(updatedPosts))
    alert("Post Updated Successfully")
  },
  handlePostCommentState: (state, action) => {
    // const updatedPosts = [...action.payload.allData]
    // let postPostion=updatedPosts[action.payload.userIndex-1]?.posts.findIndex((item)=>item?.id===action.payload.postIndex)
    // let post=updatedPosts[action.payload.userIndex-1].posts[postPostion]
    // if(action.payload.comment.body.trim()!==""){
    //   post.comments.push({
    //     postId:action.payload.postIndex,
    //     id:post.comments[post.comments.length-1].id+1,
    //     name:updatedPosts[action.payload.activeIndex-1]?.name,
    //     email:updatedPosts[action.payload.activeIndex-1]?.email,
    //     body:action.payload.comment.body
    //   })
    // }
    // updatedPosts[action.payload.userIndex-1].posts[postPostion]=post
    // localStorage.setItem('usersData',JSON.stringify(updatedPosts))
    // addAllData(updatedPosts)
    // alert("Comment Added Successfully")
  }
}
});

export const { addUsers,addAllData,handleDeletePostState,handleUpdatePostState,handleAddPostState,handlePostCommentState } = postSlice.actions;
