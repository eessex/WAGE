var AdminUsers = React.createClass({
  userRow() {
    var row
    var user_row = this.props.users.map( function(user) {
        row = <AdminUser
                key={user.id}
                user={user} />
      return row
    })
    return user_row
  },
  render() {
    return (
      <div id="users">
      	{this.userRow()}
      </div>
    );
  }
});