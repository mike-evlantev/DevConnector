import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  return (
    <li className="media">
      <Link to={`/profile/${user}`}>
        <img
          className="avatar-sm text-center rounded-circle"
          src={avatar}
          alt="gravatar"
        />
      </Link>
      <div className="media-body">
        <div className="d-flex">
          <small className="text-primary">@{name}</small>
          <div className="ml-auto">
            <small className="text-muted">
              <Moment fromNow>{date}</Moment>
            </small>{" "}
            {!auth.loading && user === auth.user._id && (
              <a href="#!" onClick={e => deleteComment(postId, _id)}>
                <i className="fas fa-trash-alt text-danger"></i>
              </a>
            )}
          </div>
        </div>
        <small className="text-break">{text}</small>
      </div>
    </li>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
