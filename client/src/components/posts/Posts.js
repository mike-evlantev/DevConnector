import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
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
          <div>Posts</div>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
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
