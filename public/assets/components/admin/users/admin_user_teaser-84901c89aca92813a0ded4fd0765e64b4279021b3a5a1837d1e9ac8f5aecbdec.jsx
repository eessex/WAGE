var AdminUserTeaser = React.createClass({
  getFiscalDates() {
    var fiscalDates
    if (this.props.user.fiscal_start) {
     fiscalDates = <span className="user-container__content-item">
        {moment(this.props.user.fiscal_start).format('MMM D') + " - " + moment(this.props.user.fiscal_end).format('MMM D')}
      </span>
    }
    return fiscalDates
  },
  getCertificationCount() {
    var certifications
    if (this.props.certifications && this.props.certifications.length > 0) {
      var inProgress = []
      var submitted = []
      var pending = []
      var certified = []
      this.props.certifications.map( function(certification) {
        if (certification.status == 0) {
          inProgress.push(certification)
        } else if (certification.status == 1) {
          submitted.push(certification)
        } else if (certification.status == 2) {
          pending.push(certification)
        } else if (certification.status == 4) {
          certified.push(certification)
        }
      })
      if (inProgress.length > 0) {
        inProgress = <span className="in-progress">{inProgress.length} In Progress</span>
      }
      if (submitted.length > 0) {
        submitted = <span className="submitted">{submitted.length} Submitted</span>
      }
      if (pending.length > 0) {
        pending = <span className="pending">{pending.length} Pending</span>
      }
      if (certified.length > 0) {
        certified = <span className="certified">{certified.length} Certified</span>
      }
      certifications = inProgress
    } else {
      certifications = <span className="certifications">No Applications</span>
    }
    return certifications
  },
	render() {
    return (
  		<a href={this.props.root + '/users/' + this.props.user.id} key={this.props.user.id} data-user={this.props.user.id} className={"user-container user-container--" + this.props.user.id + " "}>
        <h5 className='user-container__title'>
          <span className="intstitution">{this.props.user.institution_name}</span>
          <span className="name">{this.props.user.rep_name}</span>
          <span className="dates">{this.getFiscalDates()}</span>
          <span className="status">{this.getCertificationCount()}</span>
        </h5>
		  </a>
		);
	}
});