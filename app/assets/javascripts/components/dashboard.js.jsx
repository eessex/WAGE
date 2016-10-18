var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      fee_categories: this.props.fee_categories,
      user: this.props.user,
      errors: {}
    }
  },
  render() {
    return (
      <div id="dashboard">
        <div id="certification">
          <Certifications certifications={this.state.certifications} user={this.state.user} />
        </div>
        <div id="fee-schedule">
          <FeeSchedule fee_categories={this.props.fee_categories} floor_categories={this.props.fee_categories} user={this.state.user} certification={this.state.certifications[0]}/>
        </div>
      </div>
    );
  }
});
