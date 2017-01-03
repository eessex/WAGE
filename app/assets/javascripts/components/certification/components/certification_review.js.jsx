var Review = React.createClass({
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
    var file
    if (this.props[model][type] && this.props[model][type].length > 2) {
      if (this.state.certification.status < 1 || (this.state.certification.status == 1 && type != 'statement' && type != 'file_contract')) {
        file = <h5><a href={this.props[model][type]} target="_blank"><i className="fa fa-file" aria-hidden="true"></i> {title}</a>
            </h5>
      }
    }
    return file
  },
  paymentsTable() {
    var payments
    if (this.props.artist_payments && this.props.artist_payments.length > 0) {
      payments = <div className="section artist-payments clearfix">
        <h4>Artist Payments</h4><ArtistPaymentsTable artist_payments={this.props.artist_payments} _sortRowsBy={this.props._sortRowsBy} paymentsSorted={this.props.paymentsSorted} isEdit="false" fee_categories={this.props.fee_categories} /></div>
    }
    return payments
  },
  userContact() {
    var userContact
    if (this.props.newUser == "true") {
      userContact = <div className="section contact clearfix"><ReviewUserContact user={this.props.user} /></div>
    }
    return userContact
  },
  formattedOperating() {
    var formatted_operating = '$' + Number(this.props.certification.operating_expenses).toLocaleString()
    return formatted_operating
  },
  institutionInfo() {
    if (this.props.newUser == 'true') {
      return ( <div className="section certification-year clearfix">
          <h4>{this.props.user.institution_name}</h4>
          <h5>Fiscal Year: {this.props.formatted_dates}</h5>
          <h5>Total Operating Expenses: {this.formattedOperating()}</h5>
        </div>
      )
    } else {
      return ( <div className="section certification-year clearfix">
        <h4>{this.props.user.institution_name}</h4>
        <div className="col col-lg-6">
          <h5>Fiscal Year: {this.props.formatted_dates}</h5>
          <h5>Total Operating Expenses: {this.formattedOperating()}</h5>
        </div>
        {this.fileShortlist()}
      </div>
      )
    }
  },
  fileShortlist() {
    if (this.props.newUser != 'true') {
      return ( <div className="col col-lg-6">
        {this.showFile('file_budget', 'certification', "Operating Budget")}
        {this.showFile('qb_pl', 'certification', "Quickbooks P&L")}
        {this.showFile('file_990', 'certification', "Form 990")}
      </div>
      )
    }
  },
  fileNewList() {
    if (this.props.newUser == 'true') {
      return (
        <div className="section financials clearfix">
          {this.showFile('statement', 'user', "Statement of Intent")}
          {this.showFile('file_budget', 'certification', "Operating Budget")}
          {this.showFile('qb_pl', 'certification', "Quickbooks P&L")}
          {this.showFile('file_990', 'certification', "Form 990")}
          {this.showFile('file_501c3', 'certification', "501c3")}
          {this.showFile('file_contract', 'certification', "Contract Templates")}
        </div>
      )
    }
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
    var artist_payments_info
    if (!this.props.isFuture && this.state.certification.status < 1 && (new Date() < Date.parse(this.props.certification.fiscal_end))) {
      artist_payments_info =
      <div className="section artist-payments-info clearfix">
        <h4>Pending approval of this application, {this.state.user.institution_name} will have W.A.G.E. Pending status for FY {moment(this.state.certification.fiscal_end).format('YYYY')}.</h4>
        <h4>Organizations are expected to pay artist fees according to W.A.G.E.’s <a href="/fee-schedule">minimum standards</a> of compensation.</h4>
        <h4>At the close of this fiscal period your organization must provide documentation of payments using this application’s fee tracker, or by uploading a Quickbooks P&L.</h4>
      </div>
    } else if (this.props.certification.status < 2 && (new Date() < Date.parse(this.props.certification.fiscal_end) ) ) {
      artist_payments_info =
      <div className="section artist-payments-info clearfix">
        <h4>Your application is ready to submit on or after {moment(this.props.user.fiscal_end).format('MMM D, Y')}.</h4>
      </div>
    }
    if ( (this.props.certification.status < 2 && new Date() > Date.parse(this.props.certification.fiscal_end)) || (this.props.certification.status == 0 && this.props.newUser == "true") ) {
      var actions =  <button className="btn btn-lg save" onClick={this.handleSubmit}>Submit</button>
    } else if (this.props.certification.status < 2) {
      var actions = <button className="btn btn-lg save" disabled="true">Submit</button>
    } else {
      var actions
    }
    return (
      <div id="review" className="certification">
        {artist_payments_info}
        {this.institutionInfo()}
        {this.userContact()}
        {this.fileNewList()}
        {this.paymentsTable()}
        {actions}
      </div>
    );
  }
});
