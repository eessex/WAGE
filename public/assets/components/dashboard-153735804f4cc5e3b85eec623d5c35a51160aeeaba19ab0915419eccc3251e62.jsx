
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
        <h4>Dashboard</h4>
        <div id="dashboard">
          <div className="title" data-toggle="collapse" data-target="#contact">
            <h2>Contact Information</h2>
          </div>
          <div id="contact" className="user collapse in">
            <UserContact user={this.state.user} />
          </div>
          <div className="title" data-toggle="collapse" data-target="#statement">
            <h2>Statement of Intent</h2>
          </div>
          <div id="statement" className="user collapse">
            <UserStatement user={this.state.user} />
          </div>
          <div className="certifications">
            <div className="title" data-toggle="collapse" data-target="#certifications">
              <h2>Applications</h2>
            </div>
            <div id="certifications" className="certifications view collapse">
              <Certifications certifications={this.state.certifications} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
