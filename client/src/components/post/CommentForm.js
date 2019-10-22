import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };
  return (
    <div className="my-3">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <div className="input-group">
            <textarea
              name="text"
              placeholder="Leave a comment..."
              className="form-control"
              rows="3"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            ></textarea>
            <div className="input-group-append">
              <button type="submit" className="btn btn-success">
                <i className="far fa-comment"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { addComment }
)(CommentForm);
