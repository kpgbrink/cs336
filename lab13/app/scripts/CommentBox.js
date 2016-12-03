import React from 'react';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { store, ActionTools } from './flux';

export default React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        store.dispatch(ActionTools.addComment(comment));
    },
    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                data: store.getState().data
            });
        });
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});