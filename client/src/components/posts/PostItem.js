import React, { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  const [isLiked, setIsLiked] = useState();

  // const isLikedInit = async () => {
  //   const liked =
  //     (await likes.filter(like => like.user.toString() === auth.user._id)
  //       .length) > 0;
  //   setIsLiked(liked);
  // };

  const onLikeClicked = e => {
    e.preventDefault();
    setIsLiked(!isLiked);
    if (isLiked) {
      addLike(_id);
    } else {
      removeLike(_id);
    }
  };

  return (
    <div className="card mt-2">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3 text-center">
            <img
              className="avatar-md text-center rounded-circle"
              src={avatar}
              alt="gravatar"
            />
            <p>{name}</p>
          </div>
          <div className="col-sm-9">
            <span>{text}</span>
            <br />
            <small className="text-muted">
              <Moment format="YYYY/MM/DD">{date}</Moment>
            </small>
          </div>
        </div>
      </div>
      <div className="card-footer bg-transparent">
        {/* TODO: Likes */}
        {/* <div className="float-left">
          <div
            className="btn-group-toggle"
            onClick={e => onLikeClicked(e)}
            data-toggle="buttons"
          >
            <div className="mt-1 text-primary">
              <input
                type="checkbox"
                checked={isLiked}
                onChange={event => setIsLiked(event.currentTarget.checked)}
                hidden
              />{" "}
              <i
                className={isLiked ? "far fa-thumbs-up" : "fas fa-thumbs-up"}
              ></i>
              <span className="badge bg-transparent text-primary">
                {likes.length > 0 ? likes.length : ""}
              </span>
            </div>
          </div>
        </div> */}
        <div className="float-right">
          <Link to={`/posts/${_id}`} className="btn btn-outline-success btn-sm">
            Discussion
            <span className="badge badge-success ml-1">{comments.length}</span>
          </Link>
          {!auth.loading && user === auth.user._id && (
            <a href="!#" className="btn btn-danger btn-sm ml-2">
              <i className="far fa-trash-alt"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(PostItem);
