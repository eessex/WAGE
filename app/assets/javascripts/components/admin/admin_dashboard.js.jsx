var AdminDashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      users: this.props.users,
      errors: {}
    }
  },
	render() {
		return (
			<div>
        <div id="users" className="container open">
          <div className="collapse__title">
            <h1><div className='title'><span>Users</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
						<AdminUsers
							users={this.props.users} />
					</div>
				</div>
        <div id="certifications" className="container open">
          <div className="collapse__title">
            <h1><div className='title'><span>Certifications</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
						<AdminCertifications
							certifications={this.props.certifications} />
					</div>
				</div>
			</div>
		);
	}
});