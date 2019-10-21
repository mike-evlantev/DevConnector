import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentFormModal from "./CommentFormModal";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="d-flex">
        <Link to="/posts" className="btn btn-light btn-sm">
          Go Back
        </Link>
        <button
          type="button"
          className="btn btn-success btn-sm ml-auto"
          data-toggle="modal"
          data-target="#commentModal"
        >
          <i className="far fa-comment"></i>
        </button>
      </div>
      <PostItem post={post} showActions={false} />
      <ul className="media-list">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </ul>
      <CommentFormModal postId={post._id} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
