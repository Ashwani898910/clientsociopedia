import React, { useState } from "react";
import "./Post.css";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../../img/comment.png";
import SubmitIcon from "../../img/uploadComment.png"
import { getPost } from "../../api/PostsRequests";
import { CommentCard } from "../CommentCard/CommentCard";
import { commentOnPost } from '../../api/PostsRequests';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const { comments } = useSelector((state) => state.commentReducer.Comments);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [newComment, setNewComment] = useState(data.comments);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [changebtn, setChangebtn] = useState("dis-icon")




  const handleLike = () => {
    //help in api call
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };
  const handleComments = () => {
    if (show) {
      setShow(false);
    }
    else {
      setShow(true);
    }
  }
  //input comment hendle
  const [formData, setFormData] = useState("");

  const dispatch = useDispatch();
  const handlechange = (e) => {
    setFormData(e.target.value);
    if (formData.length >= 3) {
      setChangebtn("c-icon")
    }
    else {
      setChangebtn("dis-icon")
    }

  }

  //console.log(data);
  // let message = "";
  const handlePostComment = () => {
    // e.preventDefault();
    const userId = user._id;
    setMessage(formData);
    setFormData("");
    const post = data;
    setRefresh(true);
    //console.log(post._id);
    try {

      dispatch(commentOnPost(post._id, { userId, message }));
    } catch (err) {
      console.log(err);
    }
  }
  console.log(message);
  if (refresh) {
    console.log(user);
    const CommentNew = {
      message: message,
      visitor: `${user.firstname} ${user.lastname}`,
      image: user.profilePicture
    }
    newComment.push(CommentNew);

  }
  console.log(newComment);
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
          onClick={handleComments}
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
            <input type="text" className="placeholder" name="message" placeholder="write a comment . . ." value={formData} onChange={handlechange} />
            <div id="subtmitbtn" class={changebtn} onClick={handlePostComment}>
              <img className="CommentIcon" src={SubmitIcon} alt="" />
            </div>
          </div>
        </div>

      </div>






    </div>
  );
};

export default Post;
