var AdminUserShow = React.createClass({
	 componentDidMount() {
    this.watchClick()
  },
  watchClick() {
  //     $('.user-container__title').unbind().click(function(e) {
  //     if ($(e.target).closest('.user-container').hasClass('active')) {
  //       $('.user-container').removeClass('active').find('.user-container__content').slideUp()
  //     } else {
  //       $('.user-container').removeClass('active')
  //       $(e.target).closest('.user-container').addClass('active').find('.user-container__content').slideDown()
  //     }
  //     $('.user-container').not('.active').find('.user-container__content').slideUp()
  //   })
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
  showFile(type, model, title) {
    var file
    if (this.props[model][type] && this.props[model][type].length > 2) {
      file = <a href={this.props[model][type]} target="_blank">
          <i className="fa fa-file" aria-hidden="true"></i> {title}
        </a>
    }
    return file
  },
  showMaterials() {
    var file_contract = <span className='upload disabled'><i className='fa fa-file'></i> Sample Contracts <span className='req'>*</span></span>
    var file_501c3 = <span className='upload disabled'><i className='fa fa-file'></i> 501c3 <span className='req'>*</span></span>
    var statement = <span className='upload disabled'><i className='fa fa-file'></i> Statement of Intent <span className='req'>*</span></span>
    return (
      <div className="user-container__content-item section">
        <h5>{this.props.user.file_501c3 ? this.showFile('file_501c3', 'user', "501c3") : file_501c3}</h5>
        <h5>{this.props.user.file_contract ? this.showFile('file_contract', 'user', "Sample Contracts") : file_contract}</h5>
        <h5>{this.props.user.statement ? this.showFile('statement', 'user', "Statement of Intent") : statement}</h5>
      </div>
    )
  },
  getCertifications() {
    var certifications
    if (this.props.certifications) {
      certifications = <div className="certifications--table">
              <h4 className="th">
                <span>Fiscal Year</span>
                <span>Operating Expenses</span>
                <span>Application Status</span>
                <span className='updated'>Last Updated</span>
              </h4>
              <Certifications
                certifications={this.props.certifications}
                is_admin='true'
                root={this.props.root}
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
        var applications = 'Applications'
        if (inProgress.length == 1) {
          applications = 'Application'
        }
        inProgress = <span className="in-progress">{inProgress.length} {applications} In Progress</span>
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
      certifications = <span className="certifications">{inProgress}</span>
    } else {
      certifications = <span className="certifications">No Applications</span>
    }
    return certifications
  },
    navPosition() {

  },
  navigateMenu() {

  },
	render() {
    var menu = ['users', 'certifications', 'fee-categories']
		return (
			<div key={this.props.user.id} data-user={this.props.user.id} className={"user-container active user-container--" + this.props.user.id + " "}>
        <AdminMenu
          menu={menu}
          isLinked='true'
          root={this.props.root}
          navPosition={0}
          navigateMenu={this.navigateMenu} />

        <div className='user-container__title'>
        <h3>{this.props.user.institution_name}</h3>
        {this.getCertificationCount()}
        </div>
				<div className='user-container__content'>
          <div className="section">
            {this.getFiscalDates()}
            <ReviewUserContact user={this.props.user} />
          </div>
          {this.showMaterials()}
          {this.getCertifications()}
				</div>
			</div>
		);
	}
});