var AdminUser = React.createClass({
	 componentDidMount() {
    this.watchClick()
  },
  watchClick() {
    //   $('.user-container__title').unbind().click(function(e) {
    //   if ($(e.target).closest('.user-container').hasClass('active')) {
    //     $('.user-container').removeClass('active').find('.user-container__content').slideUp()
    //   } else {
    //     $('.user-container').removeClass('active')
    //     $(e.target).closest('.user-container').addClass('active').find('.user-container__content').slideDown()
    //   }
    //   $('.user-container').not('.active').find('.user-container__content').slideUp()
    // })
  },
  getFiscalDates() {
    var fiscalDates
    if (this.props.user.fiscal_start) {
     fiscalDates = <span className="user-container__content-item">
        {moment(this.props.user.fiscal_start).format('MMM D') + " - " + moment(this.props.user.fiscal_end).format('MMM D')}
      </span>
    }
    return fiscalDates
  },
  showFile(type, model, title) {
    // var file
    // if (this.props[model][type] && this.props[model][type].length > 2) {
    //   file = <a href={this.props[model][type]} target="_blank">
    //       <i className="fa fa-file" aria-hidden="true"></i> {title}
    //     </a>
    // }
    // return file
  },
  showMaterials() {
    // var file_contract = <span className='upload disabled'><i className='fa fa-file'></i> Sample Contracts <span className='req'>*</span></span>
    // var file_501c3 = <span className='upload disabled'><i className='fa fa-file'></i> 501c3 <span className='req'>*</span></span>
    // var statement = <span className='upload disabled'><i className='fa fa-file'></i> Statement of Intent <span className='req'>*</span></span>
    // return (
    //   <div className="user-container__content-item section">
    //     <h5>{this.props.user.file_501c3 ? this.showFile('file_501c3', 'user', "501c3") : file_501c3}</h5>
    //     <h5>{this.props.user.file_contract ? this.showFile('file_contract', 'user', "Sample Contracts") : file_contract}</h5>
    //     <h5>{this.props.user.statement ? this.showFile('statement', 'user', "Statement of Intent") : statement}</h5>
    //   </div>
    // )
  },
  getCertifications() {
    // var certifications
    // if (this.props.certifications) {
    //   certifications = <div className="certifications--table">
    //           <h4 className="th"><span>Fiscal Year</span><span>Application Status</span><span>Last Updated</span></h4>
    //           <Certifications
    //             certifications={this.props.certifications}
    //             is_admin='true'
    //             user={this.props.user} />
    //           </div>
    // }
    // return certifications
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
      certifications = <span className="certifications">{inProgress}</span>
    } else {
      certifications = <span className="certifications">No Applications</span>
    }
    return certifications
  },
	render() {
    return (
  		<a href={this.props.root + '/users/' + this.props.user.id} key={this.props.user.id} data-user={this.props.user.id} className={"user-container user-container--" + this.props.user.id + " "}>
        <h4 className='user-container__title'>
          {this.props.user.institution_name}
          {this.props.user.rep_name}
          {this.getFiscalDates()}
          {this.getCertificationCount()}
        </h4>
		  </a>
		);
	}
});