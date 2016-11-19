import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: '', dateStarted: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleDateStartedChange: function(e) {
    this.setState({dateStarted: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var dateStarted = this.state.dateStarted.trim();
    if (!firstName || !lastName || !dateStarted) {
      return;
    }
    this.props.onCommentSubmit({firstName: firstName, lastName: lastName, dateStarted: dateStarted});
    this.setState({firstName: '', lastName: '', dateStarted: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <label> firstName: 
        <input type="string" 
            name="firstName" 
            value={this.state.firstName} 
            onChange={this.handleFirstNameChange}/>
        </label>
        <label> lastName: 
        <input type="string" 
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}/>
        </label>
        <label> dateStarted: 
        <input type="date" 
            name="dateStarted"
            value={this.state.dateStarted}
            onChange={this.handleDateStartedChange}/>
        </label>
        <button> submit</button>
      </form>
    );
  }
});