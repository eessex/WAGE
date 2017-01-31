var AdminCertificationTeaser = React.createClass({
	 componentDidMount() {
    this.watchClick()
  },
  watchClick() {
    $('.certification-container__title').unbind().click(function(e) {
      debugger
      if ($(e.target).closest('.certification-container').hasClass('active')) {
        $('.certification-container').removeClass('active').find('.certification-container__content').slideUp()
      } else {
        $('.certification-container').removeClass('active')
        $(e.target).closest('.certification-container').addClass('active').find('.certification-container__content').slideDown()
      }
      $('.certification-container').not('.active').find('.certification-container__content').slideUp()
    })
  },
  getFiscalDates() {
    var fiscalDates
    if (this.props.user.fiscal_start) {
     fiscalDates = moment(this.props.user.fiscal_start).format('MMM D Y') + " - " + moment(this.props.user.fiscal_end).format('MMM D Y')
    }
    return fiscalDates
  },
  getCertifications() {
    return (
      <AdminCertificationShow
        user={this.props.user}
        certification={this.props.certification}
        artist_payments={this.props.artist_payments} />
      )
  },
  getStatus() {
    var formatted_status
    if (this.props.certification.status == 0 ) {
      formatted_status = "Application In Progress"
    } else if (this.props.certification.status == 1 ) {
      formatted_status = "Appplication Under Review"
    } else if (this.props.certification.status == 2 ) {
      formatted_status = "W.A.G.E. Certified Pending"
    } else if (this.props.certification.status == 3 ) {
      var formatted_status = "Appplication Under Review"
    } if (this.props.certification.status == 4 ) {
      var formatted_status = "W.A.G.E. Certified"
    } else if (this.props.certification.status == 5 ) {
      formatted_status = "Pending Updates"
    }
    return formatted_status
  },
	render() {
		return (
			<div key={this.props.certification.id} data-certification={this.props.certification.id} className={"certification-container certification-container--" + this.props.certification.id + " "}>
				<h4 className='certification-container__title'>
          {this.getFiscalDates()}
          {this.props.user.institution_name}
          {this.getStatus()}
        </h4>
				<div className='certification-container__content'>
          {this.getCertifications()}
				</div>
			</div>
		);
	}
});