import React from 'react';
import Remarkable from 'remarkable';

export default React.createClass({
  rawMarkup: function() {
    var rawMarkup = new Remarkable().render(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <p>
            {this.props.firstName + " " + this.props.lastName + " " + this.props.dateStarted}
        </p>
      </div>
    );
  }
});