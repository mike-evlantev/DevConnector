import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostFormModal from "./PostFormModal";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {posts === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="d-flex">
            <h5 className="large text-primary">Posts</h5>
            <button
              type="button"
              className="btn btn-success btn-sm ml-auto"
              data-toggle="modal"
              data-target="#postModal"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <PostFormModal />
          {posts.map(post => (
            <PostItem key={post._id} post={post} showActions={true} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
