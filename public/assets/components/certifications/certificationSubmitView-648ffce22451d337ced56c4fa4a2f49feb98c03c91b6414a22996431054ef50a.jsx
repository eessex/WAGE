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
  showFile(type, model, title) {
    if (this.props[model][type] && this.props[model][type].length > 2) {
      var file =
              <h5><a href={this.props[model][type]} target="_blank"><i className="fa fa-file" aria-hidden="true"></i> {title}</a>
            </h5>
    } else {
      var file
    }
    return file
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
        <h4>Artist Payments</h4>
        <h5>Pending approval of this application, {this.state.user.institution_name} will have W.A.G.E. Pending status for FY {moment(this.state.certification.fiscal_start).format('YYYY')}.</h5>
        <h5>Organizations are expected to pay artist fees according to W.A.G.E.’s <a href="/fee-schedule">minimum standards</a> of compensation.</h5>
        <h5>At the close of this fiscal period your organization must provide documentation of payments using this application's fee tracker, or by uploading a Quickbooks P&L.</h5>
      </div>
    }
    if (this.props.certification.status < 2) {
      var actions =  <button className="btn btn-lg save" onClick={this.handleSubmit}>Submit</button>
    } else {
      var actions
    }
    var displayStreet = <span>{this.props.user.address_st2 ? ", " + this.props.user.address_st2 : ""}</span>;
    return (
      <div id="review" className="certification">
        <div className="section certification-year clearfix">
          <h4>{this.props.user.institution_name}</h4>
          <h5>Fiscal Year: {this.props.formatDates()}</h5>
          <h5>Total Operating Expenses: {formatted_operating}</h5>
        </div>
        <div className="section contact clearfix">
          <div className="col col-lg-6">
            <h5>{this.props.user.rep_name}, {this.props.user.rep_title}</h5>
            <h5>{this.props.user.email}</h5>
            <h5>{this.props.user.phone}</h5>
          </div>
          <div className="col col-lg-6">
            <h5>{this.props.user.address_st1}{displayStreet}</h5>
            <h5>{this.props.user.address_city}, {this.props.user.address_state} {this.props.user.address_zip}</h5>
            <h5><a href={this.props.user.website} target="_blank">{this.props.user.website}</a></h5>
          </div>
        </div>
        <div className="section financials clearfix">
          {this.showFile('statement', 'user', "Statement of Intent")}
          {this.showFile('file_budget', 'certification', "Operating Budget")}
          {this.showFile('file_990', 'certification', "Form 990")}
          {this.showFile('file_501c3', 'certification', "501c3")}
          {this.showFile('file_contract', 'certification', "Contract Templates")}
        </div>
        {artist_payments}
        {actions}
      </div>
    );
  }
});
