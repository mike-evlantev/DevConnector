import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentFormModal = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    addComment(postId, { text });
    setText("");
  };
  return (
    <div
      className="modal fade"
      id="commentModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="commentModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">
              Add a comment
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <textarea
                  name="text"
                  placeholder="Say something..."
                  className="form-control"
                  rows="5"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-success btn-sm my-2 float-right"
                  data-toggle="modal"
                  data-target="#commentModal"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { addComment }
)(CommentFormModal);
