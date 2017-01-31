var AdminUser = React.createClass({
	 componentDidMount() {
    this.watchClick()
  },
  watchClick() {
      $('.user-container__title').unbind().click(function(e) {
      if ($(e.target).closest('.user-container').hasClass('active')) {
        $('.user-container').removeClass('active').find('.user-container__content').slideUp()
      } else {
        $('.user-container').removeClass('active')
        $(e.target).closest('.user-container').addClass('active').find('.user-container__content').slideDown()
      }
      $('.user-container').not('.active').find('.user-container__content').slideUp()
    })
  },
  getFiscalDates() {
    var fiscalDates
    if (this.props.user.fiscal_start) {
     fiscalDates = <h5 className="user-container__content-item">
        Fiscal Period: {moment(this.props.user.fiscal_start).format('MMM D') + " - " + moment(this.props.user.fiscal_end).format('MMM D')}
      </h5>
    }
    return fiscalDates
  },
  getCertifications() {
    var certifications
    if (this.props.certifications) {
      certifications = <div className="certifications--table">
              <h4 className="th"><span>Fiscal Year</span><span>Application Status</span><span>Last Updated</span></h4>
              <Certifications
                certifications={this.props.certifications}
                is_admin='true'
                user={this.props.user} />
              </div>
    }
    return certifications
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
        inProgress = <span className="progress">{inProgress.length} In Progress</span>
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
      certifications = <div className="certifications">{inProgress}</div>
    } else {
      certifications = <div className="certifications">No Applications</div>
    }
    return certifications
  },
	render() {
		return (
			<div key={this.props.user.id} data-user={this.props.user.id} className={"user-container user-container--" + this.props.user.id + " "}>
				<h4 className='user-container__title'>{this.props.user.institution_name}{this.getCertificationCount()}</h4>
				<div className='user-container__content'>
          {this.getFiscalDates()}
          <ReviewUserContact user={this.props.user} />
          {this.getCertifications()}
				</div>
			</div>
		);
	}
});