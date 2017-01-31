var AdminDashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      users: this.props.users,
      root: this.props.path,
      navPosition: 0,
      errors: {}
    }
  },
  navigateMenu(item) {
    window.location.hash = ''
    this.setState({navPosition: item})
  },
  getContent() {
    var content
    if (this.state.navPosition == 0) {
      content = <div id="users" className="admin-dashboard--users">
          <div className="admin-dashboard__header">
            <h1 className='title'><span>Users</span></h1>
          </div>
          <div className="admin-dashboard__content">
            <AdminUsers
              users={this.props.users}
              certifications={this.props.certifications} />
          </div>
        </div>
    } else if (this.state.navPosition == 1) {
      content = <div id="certifications" className="admin-dashboard--certifications">
          <div className="admin-dashboard__header">
            <h1 className='title'><span>Certifications</span></h1>
          </div>
          <div className="admin-dashboard__content">
            <AdminCertifications
              users={this.props.users}
              certifications={this.props.certifications} />
          </div>
        </div>
    } else if (this.state.navPosition == 2) {
      content = <div id="fee-categories" className="admin-dashboard--fee-categories">
          <div className="admin-dashboard__header">
            <h1 className='title'><span>Fee Categories</span></h1>
          </div>
          <div className="admin-dashboard__content">
            <FeeCategories
              fee_categories={this.props.fee_categories} />
          </div>
          </div>
    }
    return content
  },
	render() {
    var menu = ['users', 'certifications', 'fee-categories']
		return (
			<div className="admin-dashboard">
        <AdminMenu
          menu={menu}
          navPosition={this.state.navPosition}
          navigateMenu={this.navigateMenu} />
          {this.getContent()}
			</div>
		);
	}
});