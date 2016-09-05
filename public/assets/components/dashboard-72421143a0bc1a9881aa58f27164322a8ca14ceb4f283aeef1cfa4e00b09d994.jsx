
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
          <div className="title" data-toggle="collapse" data-target="#contact">
            <h2><span>Contact Information</span></h2>
          </div>
          <div id="contact" className="user collapse in">
            <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
            <UserContact user={this.state.user} />
          </div>
          <div className="title" data-toggle="collapse" data-target="#statement">
            <h2><span>Statement of Intent</span></h2>
          </div>
          <div id="statement" className="user collapse">
            <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
            <div className="header col-xs-12">
              <h4>A letter detailing your organization's interest in W.A.G.E. Certification.</h4>
            </div>
            <UserStatement user={this.state.user} />
          </div>
          <div className="certifications">
            <div className="title" data-toggle="collapse" data-target="#certifications">
              <h2><span>Applications</span></h2>
            </div>
            <div id="certifications" className="certifications view collapse">
              <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
              <Certifications certifications={this.state.certifications} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
