var CertificationSubmitView = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments,
      certifications: this.props.certifications
    }
  },
  handleSubmit() {
    this.props.handleSubmit(this.props.certification)
  },
  showStatement() {
    if (this.props.certifications.length < 2) {
      var statement = <div className="section statement clearfix">
              <h3>Statement of Intent</h3>
              <p>{this.state.user.statement}</p>
            </div>
    } else {
      var statement
    }
    return statement
  },
  render() {
    if (moment(this.state.certification.fiscal_start).format('YYYY') == moment(this.state.certification.fiscal_end).format('YYYY')) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YYYY')
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YY') + "-" + moment(this.state.certification.fiscal_end).format('YY')
    }
    if (moment(this.props.user.fiscal_start).format('Y') == moment(this.props.user.fiscal_end).format('Y')) {
      var format_start = moment(this.props.user.fiscal_start).format('MMM D - ')
    } else {
      var format_start = moment(this.props.user.fiscal_start).format('MMM D, ')
    }
    var fiscal_dates_show = <span>{format_start}{moment(this.props.user.fiscal_end).format('MMM D, Y')}</span>
    var formatted_operating = '$' + Number(this.props.certification.operating_expenses).toLocaleString()
    if (this.props.isFuture) {
      var artist_payments
    } else {
      var artist_payments =
      <div className="section artist-payments clearfix">
        <h4>Pending approval of this application, {this.state.user.institution_name} will have W.A.G.E. Pending status for FY {moment(this.state.certification.fiscal_start).format('YYYY')}.</h4>
        <h4>Organizations are expected to pay artist fees according to W.A.G.E.’s <a href="/fee-schedule">minimum standards</a> of compensation.</h4>
        <h4>At the close of this fiscal period your organization must provide documentation of payments using this application's fee tracker, or by uploading a Quickbooks P&L.</h4>
      </div>
    }
    if (this.props.certification.status < 2) {
      var actions =  <button className="btn btn-lg save" onClick={this.handleSubmit}>Submit</button>
    } else {
      var actions
    }

    return (
      <div id="review" className="certification">
        <div className="section contact clearfix">
          <h3>Contact Information</h3>
          <h4>{this.props.user.institution_name}</h4>
          <div className="col col-lg-6">
            <p>{this.props.user.rep_name}, {this.props.user.rep_title}</p>
            <p>{this.props.user.email}</p>
            <p>{this.props.user.phone}</p>
          </div>
          <div className="col col-lg-6">
            <p>{this.props.user.address_st1}, {this.props.user.address_st2}</p>
            <p>{this.props.user.address_city}, {this.props.user.address_state} {this.props.user.address_zip}</p>
            <p><a href={this.props.user.website} target="_blank">{this.props.user.website}</a></p>
          </div>
        </div>
        {this.showStatement()}
        <div className="section financials clearfix">
          <h3>Financial Details</h3>
          <h4>TAOE: {formatted_operating}</h4>
          <p><strong>Operating Budget:</strong> <a href={this.props.certification.file_budget} target="_blank">{this.props.certification.file_budget}</a></p>
          <p><strong>Form 990:</strong> <a href={this.props.certification.file_990} target="_blank">{this.props.certification.file_990}</a></p>
          <p><strong>501c3:</strong> <a href={this.props.user.file_501c3} target="_blank">{this.props.user.file_501c3}</a></p>
          <p><strong>Contract Template:</strong> <a href={this.props.user.file_contract} target="_blank">{this.props.certification.file_contract}</a></p>
        </div>
        {artist_payments}
        {actions}
      </div>
    );
  }
});
