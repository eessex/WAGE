var AdminCertificationTeaser = React.createClass({
  getFiscalDates() {
    var fiscalDates
    if (this.props.user.fiscal_start) {
     fiscalDates = moment(this.props.user.fiscal_start).format('MMM D Y') + " - " + moment(this.props.user.fiscal_end).format('MMM D Y')
    }
    return fiscalDates
  },
  getOperatingExpenses() {
    var operating_expenses
    if (this.props.certification.operating_expenses && this.props.certification.operating_expenses > 0) {
      operating_expenses = <span className="operating">${Number(this.props.certification.operating_expenses).toLocaleString()}</span>
    } else {
      operating_expenses = <span className="operating disabled">${Number(this.props.certification.operating_expenses).toLocaleString()}</span>
    }
    return operating_expenses
  },
  getStatus() {
    var formatted_status
    if (this.props.certification.status == 0 ) {
      formatted_status = "In Progress"
    } else if (this.props.certification.status == 1 ) {
      formatted_status = "Pending Review"
    } else if (this.props.certification.status == 2 ) {
      formatted_status = "W.A.G.E. Certified Pending"
    } else if (this.props.certification.status == 3 ) {
      var formatted_status = "Payments Pending Review"
    } if (this.props.certification.status == 4 ) {
      var formatted_status = "W.A.G.E. Certified"
    } else if (this.props.certification.status == 5 ) {
      formatted_status = "Please Revise Application"
    }
    return formatted_status
  },
	render() {
		return (
			<a href={this.props.root + "/certifications/" + this.props.certification.id } key={this.props.certification.id} data-certification={this.props.certification.id} className={"certification-container certification-container--" + this.props.certification.id + " "}>
        <h5 className='certification-container__title'>
          <span className="fiscal-dates">{this.getFiscalDates()}</span>
          <span className="institution-name">{this.props.user.institution_name}</span>
          {this.getOperatingExpenses()}
          <span className="status">{this.getStatus()}</span>
          <span className="updated">{moment(this.props.certification.updated_at).fromNow()}</span>
        </h5>
      </a>
		);
	}
});