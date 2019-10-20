import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostFormModal = ({ addPost }) => {
  const [text, setText] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };
  return (
    <div
      className="modal fade"
      id="postModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="postModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="postModalLabel">
              Add a post
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
                  data-target="#exampleModal"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </form>
          </div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { addPost }
)(PostFormModal);
