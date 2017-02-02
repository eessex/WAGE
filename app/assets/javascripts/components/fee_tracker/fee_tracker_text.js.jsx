var FeeTrackerText = React.createClass({
  formatDates() {
    var date
    if (moment(this.props.certification.fiscal_start).format('Y') == moment(this.props.certification.fiscal_end).format('Y')) {
      date = moment(this.props.certification.fiscal_start).format('MMM D') + " - " + moment(this.props.certification.fiscal_end).format('MMM D, Y')
    } else {
      date = moment(this.props.certification.fiscal_start).format('MMM D, Y') + " - " + moment(this.props.certification.fiscal_end).format('MMM D, Y')
    }
    return date
  },
  showTrackerLink() {
    var link
    if (this.props.showForm) {
      link = <span>Fee Tracker</span>
    } else {
      link = <span><a onClick={this.props.toggleTracker}>Fee Tracker</a></span>
    }
    return link
  },
	render() {
    var new_user
    if (this.props.certification.status == 0 && this.props.new_user) {
      new_user = <h4>The Fee Tracker is disabled until you submit this application.</h4>
      // new_user = <h4>You may submit your application now to become W.A.G.E. Certified Pending, and can return to the {this.showTrackerLink()} at any time.</h4>
    }
    var upcoming_user
    if (this.props.yearStatus != 'past') {
      upcoming_user = <span>At the end of your fiscal year, i</span>
    } else {
      upcoming_user = <span>I</span>
    }
		return (
      <div className="fee-tracker__intro">
				{new_user}
				<h4>Use the Fee Tracker to document each fee payment to made to an artist between {this.formatDates()}.</h4>
				<h4>{upcoming_user}f you have successfully demonstrated having paid artist fees according to <a onClick={this.props.goFeeSchedule}>W.A.G.E.’s minimum standards of compensation</a>, your organization will become W.A.G.E. Certified for fiscal year {moment(this.props.certification.fiscal_end).format('Y')}.</h4>
	      <h4 className="confidentiality">* All documentation is confidential and reviewed internally only.</h4>
      </div>
		)
	}
})