import React, { useState } from "react";
import "./Post.css";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../../img/comment.png";
import SubmitIcon from "../../img/uploadComment.png"
//import { getPost } from "../../api/PostsRequests";
import { CommentCard } from "../CommentCard/CommentCard";
import { commentOnPost } from '../../api/PostsRequests';
import InputEmoji from 'react-input-emoji'

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const { comments } = useSelector((state) => state.commentReducer.Comments);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [newComment, setNewComment] = useState([...data.comments]);
  //const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [changebtn, setChangebtn] = useState("dis-icon")
  const [formData, setFormData] = useState("");
  const dispatch = useDispatch();
  let message = "";

  // handle clike and unlike
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };
  // handle Hide  And Show Comments 
  const HideAndShowComments = () => {
    if (show) {
      setShow(false);
    }
    else {
      setShow(true);
    }
  }
  //input comment handle
  const handlechange = (formData) => {
    setFormData(formData);
    // console.log(formData);
    if (formData.length >= 3) {
      setChangebtn("c-icon")
    }
    else {
      setChangebtn("dis-icon")
    }

  }

  // Handle Submit Comment
  const HandleSubmitComment = () => {
    // e.preventDefault();
    const userId = user._id;
    console.log(formData)
    message = formData
    console.log(message);
    setFormData("");
    const post = data;
    setRefresh(true);
    const CommentNew = {
      _id:"",
      visitorId:user._id,
      message: message,
      visitor: `${user.firstname} ${user.lastname}`,
      image: user.profilePicture
    }
    console.log(newComment.length);
    if(message!=""){
      //console.log(data.comments);
      data.comments.push(CommentNew);
     // console.log(newComment);

     }
     //else{
    //   setNewComment(newComment.push(CommentNew));

    // }
    // console.log(newComment);
    try {

      dispatch(commentOnPost(post._id, { userId, message }));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={Comment} alt=""
          onClick={HideAndShowComments}
        />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
      <div>
        {

          (show) ? (data.comments.length >= 1) ?
            data.comments.map((comment, id) => {
              let props = {
                Data: comment
              }
              return (
                <CommentCard data={props} key={id} />

              );
            })
            :
            ""
            : (data.comments.length >= 1) ?
              <>
                <CommentCard data={{
                  Data: data.comments[data.comments.length - 1]
                }} />
              </>
              : ""
        }
        {/* <CommentInput id={data._id}/> */}
        <div class="card-comment-input">
          <div class="current-user-profile-image--small">
            <img
              style={{ width: 40, height: 40, borderRadius: "50%", justifyItems: "center", marginTop: "4px" }}
              src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : ""} alt="" />
          </div>
          <div class="Search">
            <InputEmoji
              value={formData}
              onChange={handlechange}

            />
            {/* <input type="text" className="placeholder" name="message" placeholder="write a comment . . ." value={formData} onChange={handlechange} /> */}
            <div id="subtmitbtn" class={changebtn} onClick={HandleSubmitComment}>
              <img className="CommentIcon" src={SubmitIcon} alt="" />
            </div>
          </div>
        </div>

      </div>






    </div>
  );
};

export default Post;
