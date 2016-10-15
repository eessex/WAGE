var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      user: this.props.user,
      errors: {}
    }
  },
  render() {
    return (
      <div id="dashboard">
      <Certifications certifications={this.state.certifications} user={this.state.user} />
      </div>
    );
  }
});
