import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth
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
          <small>{name}</small>
          <small className="ml-auto text-muted">
            <Moment fromNow>{date}</Moment>
          </small>
        </div>
        {text}
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
