import React from 'react';
import Comment from './Comment.js';


export default React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment firstName={comment.firstName} lastName={comment.lastName} dateStarted={comment.dateStarted} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
