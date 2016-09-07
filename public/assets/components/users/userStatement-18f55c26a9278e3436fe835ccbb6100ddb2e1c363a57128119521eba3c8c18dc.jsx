var UserStatement = React.createClass({
  getInitialState() {
    var status = this.setStatus(this.props.user)
    var progress = this.setProgress(status)
    return {
      user: this.props.user,
      status: status,
      progress: progress,
      editMode: this.isNew(),
      errors: {}
    }
  },
  isNew() {
    if (this.props.user.statement && this.props.user.statement != "") {
      return false
    } else {
      return true
    }
  },
  setEditMode() {
    this.setState({editMode: true});
  },
  setStatus(user) {
    status = 0
    if (user.statement && user.statement.length > 300 ) {
      status += 1
    }
    return status
  },
  setProgress(status) {
    if (status == 0) {
      var progress = "empty"
    } else if (status == 2 ) {
      var progress = "complete"
    } else {
      var progress = "pending"
    }
    return progress
  },
  handleStatementChange(e) {
    var newUser = this.state.user
    newUser.statement = e.target.value
    this.setState({user: newUser});
  },
  toggleStatus: function () {
    var newUser = this.state.user
    newUser.status = !this.state.user.status
    this.handleUserUpdate();
  },
  handleUserUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        user: that.state.user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          // user: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleUserDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/users/' + that.state.user.id + '.json',
      success: function(res) {
        that.props.onDeleteUser(that.state.user);
      }
    })
  },

  render() {
    var form = <div className="form">
      <div className="field-group">
        <textarea
          placeholder="statement"
          name="statement"
          className="form-control"
          value={this.state.user.statement}
          onChange={this.handleStatementChange} />
        <span style={{color: 'red'}}>{this.state.errors.statement}</span>
      </div>
    </div>

    if ( this.state.editMode ) {
      markup = (
        <div className="edit">
        <div className="actions col-sm-12 col-lg-2">
          <button className="btn btn-lg" onClick={this.handleUserUpdate}>Save</button>
        </div>
          <div className="rep col-sm-12 col-lg-8">
            {form}
          </div>
        </div>
      );
    } else {
      markup = (
        <div className="view">
          <div className="actions col-sm-12 col-lg-2">
            <button className="btn btn-sm" onClick={this.setEditMode}>Edit</button>
          </div>
          <div className="rep col-sm-12 col-lg-8">
            <div>{this.state.user.statement}</div>
          </div>
        </div>
      );
    }
    return (
              <div>
      <div className="title" data-toggle="collapse" data-target="#statement" href="#statement">
        <h2><span>Statement of Intent</span></h2>
        <h5 className="status">{this.state.status}/1 <i className={this.state.progress + " fa fa-circle"} aria-hidden="true"></i></h5>
      </div>
      <div id="statement" className="statement view collapse">
        <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
        <div className="header">
          <h4>A letter detailing your organization's interest in W.A.G.E. Certification.</h4>
        </div>
        {markup}
        </div>
    </div>
    )
  }
});
