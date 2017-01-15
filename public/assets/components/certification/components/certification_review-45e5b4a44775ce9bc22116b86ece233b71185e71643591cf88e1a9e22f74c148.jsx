var CertificationReview = React.createClass({
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
  userContact() {
    var userContact
    if (this.props.new_user) {
      userContact = <div className="section contact clearfix">
        <ReviewUserContact user={this.props.user} /></div>
    }
    return userContact
  },
  formattedOperating() {
    var formatted_operating = '$' + Number(this.props.certification.operating_expenses).toLocaleString()
    return formatted_operating
  },
  institutionInfo() {
    var file_budget = <span className='upload disabled'><i className='fa fa-file'></i> Operating Budget <span className='req'>*</span></span>
    return ( <div className="section certification-year clearfix">
        <h5>Fiscal Year: {this.props.formatted_dates}</h5>
        <h5>Total Annual Operating Expenses: {this.props.certification.operating_expenses ? this.formattedOperating() : this.formattedOperating()}</h5>
        <h5>{this.props.certification.file_budget ? this.showFile('file_budget', 'certification', "Operating Budget") : file_budget}</h5>
      </div>
    )
  },
  showMaterials() {
    var file_contract = <span className='upload disabled'><i className='fa fa-file'></i> Sample Contracts <span className='req'>*</span></span>
    var file_990 = <span className='upload disabled'><i className='fa fa-file'></i> Form 990 <span className='suggested'>* If Available</span></span>
    var file_501c3 = <span className='upload disabled'><i className='fa fa-file'></i> 501c3 <span className='req'>*</span></span>
    var statement = <span className='upload disabled'><i className='fa fa-file'></i> Statement of Intent <span className='req'>*</span></span>
    return (
      <div className="section financials clearfix">
        <h5>{this.props.user.file_501c3 ? this.showFile('file_501c3', 'user', "501c3") : file_501c3}</h5>
        <h5>{this.props.certification.file_990 ? this.showFile('file_990', 'certification', "Form 990") : file_990}</h5>
        <h5>{this.props.certification.file_contract ? this.showFile('file_contract', 'certification', "Sample Contracts") : file_contract}</h5>
        <h5>{this.props.user.statement ? this.showFile('statement', 'user', "Statement of Intent") : statement}</h5>
      </div>
    )
  },
  paymentsTable() {
    var payments
    if (this.props.artist_payments && this.props.artist_payments.length > 0) {
      payments = <div className="section artist-payments clearfix">
        <h3 className="section artist-payments__title">Artist Payments</h3>
        <ArtistPaymentsTable
          artist_payments={this.props.artist_payments}
          sortRowsBy={this.props.sortRowsBy}
          isEdit="false"
          fee_categories={this.props.fee_categories} /></div>
    }
    return payments
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
        <h4>Pending approval of this application, {this.state.user.institution_name} will have W.A.G.E. Certified Pending status for FY {moment(this.state.certification.fiscal_end).format('YYYY')}.</h4>
        <h4>Your organization is expected to pay artist fees according to <a onClick={this.props.goFeeSchedule}>W.A.G.E.’s minimum standards of compensation</a>.</h4>

        <h4>At the close of this fiscal period your organization must provide documentation of fee payment using the <a onClick={this.props.goFeeTracker}>Fee Tracker</a>. You can upload this information anytime during the fiscal year or you can wait until the fiscal year has ended. At that point you may also upload a QuickBooks statement but it must contain your history of fee payment for the entire year.</h4>
      </div>
    } else if (this.props.certification.status < 2 && (new Date() < Date.parse(this.props.certification.fiscal_end) ) ) {
      artist_payments_info =
      <div className="section artist-payments-info clearfix">
        <h4>Your application is ready to submit on or after {moment(this.props.user.fiscal_end).format('MMM D, Y')}.</h4>
      </div>
    }
    var actions
    if (this.props.certification.status < 1 && this.props.new_user ) {
      var disabled
      var click
      if ( moment(this.props.certification.fiscal_end) <= moment(new Date) ) {
        // year is past
          if(this.props.canSubmit != 'true') {
            disabled = true
          } else {
            click = this.handleSubmit
          }
      }
      if ( moment(this.props.certification.fiscal_end) > moment(new Date) ) {
        // year is current or future
        if (this.props.new_user) {
          if(this.props.canSubmit != 'true') {
            disabled = true
          } else {
            click = this.handleSubmit
          }
        } else {
          disabled = true
        }
      }
    //   new Date() > Date.parse(this.props.certification.fiscal_end)) || (this.props.certification.status == 0 && this.props.new_user == "true") ) {
      // actions =  <button className="btn btn-lg next" onClick={click}>Submit</button>
    // } else if (this.props.certification.status < 2) {
    //   if (this.props.canSubmit != 'true') {
    //     disabled = true
    //   }
      actions = <button className="btn btn-lg next" onClick={click} disabled={disabled}>Submit Application <i className='fa fa-long-arrow-right'></i></button>
    // } else {
    //   var actions
    }
    return (
      <div className="certification certification-review">
        <div className="certification-review__intro">
          {artist_payments_info}
        </div>
        <div className="certification-review__body">
          <h3>{this.props.user.institution_name}</h3>
          {this.userContact()}
          {this.institutionInfo()}
          {this.showMaterials()}
        </div>
        <div className="certification-review__payments">
          {this.paymentsTable()}
        </div>
        <div className='certification-view__next'>
          {actions}
        </div>
      </div>
    );
  }
});


