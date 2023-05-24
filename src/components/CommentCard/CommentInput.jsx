import react, { useState } from 'react'
import PostComment from "../../img/uploadComment.png"
import { useSelector,useDispatch } from "react-redux";
import { commentOnPost } from '../../api/PostsRequests';


export const CommentInput = (data) => {
    
    const { user } = useSelector((state) => state.authReducer.authData);
    const [formData, setFormData] = useState("");
    const dispatch = useDispatch();
    const handlechange = (e) => {
        setFormData(e.target.value);
        
    }
    const handlePostComment=()=>{
       // e.preventDefault();
        const userId=user._id;
        const message=formData;
        const post=data;
        console.log(post.id);
        try {
            dispatch(commentOnPost(post.id, { userId, message }));
          } catch (err) {
            console.log(err);
          }
    } 
    return (
        <>
            {/* <div class="card-comment-input">
                <div class="current-user-profile-image--small">
                    <img
                    style={{ width: 40, height: 40, borderRadius: "50%", justifyItems: "center" ,marginTop:"4px"}}
                     src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : ""} alt="" />
                </div>
                <div class="Search">
                    <input type="text" className="placeholder" name="message" placeholder="write a comment . . ." onChange={handlechange} />
                    <div class="s-icon " onClick={handlePostComment}>
                        <img className="CommentIcon" src={PostComment} alt="" />
                    </div>
                </div>
            </div> */}
        </>
    );
}