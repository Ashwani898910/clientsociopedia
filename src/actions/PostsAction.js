import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getPost=(id)=>async(dispatch)=>{
  dispatch({ type: "POST_RETREIVING_START" });
  try {
    const { data } = await PostsApi.getPost(id);
    dispatch({ type: "POST_RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "POST_RETREIVING_FAIL" });
  }
}

export const commentOnPost=(id, { userId, message })=>async (dispatch) => {
  dispatch({ type: "Comment_ON" });
  try {
    const newComment =await PostsApi.commentOnPost(id, { userId, message });
    dispatch({ type: "Comment_SUCCESS", data: newComment });
  } catch (error) {
    console.log(error);
    dispatch({ type: "Comment_FAIL" });
  }
}
