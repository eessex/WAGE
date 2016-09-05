var UserStatement = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
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
    return markup;
  }
});
