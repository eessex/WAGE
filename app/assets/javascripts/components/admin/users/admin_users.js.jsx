var AdminUsers = React.createClass({
  userRow() {
    var row
    var that = this
    var user_row = this.props.users.map( function(user) {
      var certifications = []
      that.props.certifications.map( function(certification) {
        if (certification.user_id == user.id) {
          certifications.push(certification)
        }
      })
      row = <AdminUserTeaser
              key={user.id}
              root={that.props.root}
              certifications={certifications.length > 0 ? certifications : null}
              user={user} />
      return row
    })
    return user_row
  },
  render() {
    return (
      <div className='admin--users-table'>
        <h5 className='th'>
          <span>Name</span>
          <span>Representative</span>
          <span>Fiscal Dates</span>
          <span>Applications</span>
        </h5>
      	{this.userRow()}
      </div>
    );
  }
});