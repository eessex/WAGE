
var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      user: this.props.user,
      certification: {
        fiscal_start: '',
        fiscal_end: '',
        status: 0
      },
      errors: {}
    }
  },
  render() {
    return (
      <div className="dashboard">
        <div className="greeting">
          <h4>Dashboard : {this.state.user.institution_name} </h4>
        </div>
        <div id="dashboard">
            <UserContact user={this.state.user} />
            <UserStatement user={this.state.user} />
            <Certifications certifications={this.state.certifications} />
        </div>
      </div>
    );
  }
});
