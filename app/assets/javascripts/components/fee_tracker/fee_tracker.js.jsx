 var FeeTracker = React.createClass({
  getInitialState() {
    return {
      showForm: true,
      errors: {}
    }
  },
  toggleQbPl() {
    this.setState({ showForm: false })
  },
  toggleTracker() {
    this.setState({ showForm: true })
  },
  showForms() {
    var disabled
    if (this.props.yearStatus == 'future' || this.props.new_user) {
      disabled = ' disabled'
    }
    if (this.state.showForm) {
      var subtitle
      if (this.props.yearStatus == 'current' && this.props.new_user) {
        subtitle = <span className='subtitle'>* submit your application to begin using the Fee Tracker.</span>
      }
      if (this.props.yearStatus == 'future') {
        subtitle = <span className='subtitle'>* when your fiscal year has started</span>
      }
      return (
        <div className={'fee-tracker__payments new-form ' + disabled}>
          <div className='title'>
            <h3>Create A New Payment{subtitle}</h3>
            <h6 onClick={this.toggleQbPl}>Upload Quickbooks File</h6>
          </div>
          <FeeTrackerNew
            new_user={this.props.new_user}
            yearStatus={this.props.yearStatus}
            certification={this.props.certification}
            fee_categories={this.props.fee_categories}
            handleAddArtistPayment={this.props.handleAddArtistPayment} />
        </div>
      )
    } else {
      if (this.props.yearStatus == 'current') {
        subtitle = <span className='subtitle'>* at the close of your fiscal year</span>
      }
      return (
        <div className={'fee-tracker__payments ql-pl' + disabled}>
        <div className='title'>
          <h3>Upload Quickbooks File{subtitle}</h3>
          <h6 onClick={this.toggleTracker}>Create A New Payment</h6>
        </div>
         {this.formQbPl()}
        </div>
      )
    }
  },
  formatDates() {
    var date
    if (moment(this.props.certification.fiscal_start).format('Y') == moment(this.props.certification.fiscal_end).format('Y')) {
      date = moment(this.props.certification.fiscal_start).format('MMM D') + " - " + moment(this.props.certification.fiscal_end).format('MMM D, Y')
    } else {
      date = moment(this.props.certification.fiscal_start).format('MMM D, Y') + " - " + moment(this.props.certification.fiscal_end).format('MMM D, Y')
    }
    return date
  },
  formQbPl() {
    var disabled
    if (this.props.yearStatus == 'future' || this.props.yearStatus == 'current') {
      disabled = true
    } else {
      disabled = false
    }
    var qb_pl = <UploadFile
        model={this.props.certification}
        required='true'
        type='qb_pl'
        disabled={disabled}
        handleFileUpdate={this.props.handleCertificationUpdate}
        accept='application/pdf' />
    return qb_pl
  },
  showTrackerLink() {
    var link
    if (this.state.showForm) {
      link = <span>Fee Tracker</span>
    } else {
      link = <span><a onClick={this.toggleTracker}>Fee Tracker</a></span>
    }
    return link
  },
  showQbPlLink() {
    var link
    if (this.state.showForm) {
      link = <span>Alternatively, you may <a onClick={this.toggleQbPl}>upload a Quickbooks statement.</a></span>
    } else {
      link = <span>Alternatively, you may upload a Quickbooks statement.</span>
    }
    return link
  },
  paymentsTable() {
    var payments
    if (this.state.showForm) {
      if (this.props.artist_payments && this.props.artist_payments.length > 0) {
        payments = <div className="section artist-payments clearfix">
          <h3 className="section artist-payments__title">Artist Payments</h3>
          <ArtistPaymentsTable
            artist_payments={this.props.artist_payments}
            sortRowsBy={this.props.sortRowsBy}
            paymentsSorted={this.props.paymentsSorted}
            isEdit="true"
            handleArtistPaymentUpdate={this.props.handleArtistPaymentUpdate}
            handleDeleteArtistPayment={this.props.handleDeleteArtistPayment}
            fee_categories={this.props.fee_categories} /></div>
      }
    }
    return payments
  },
  render() {
    var new_user
    if (this.props.certification.status == 0 && this.props.new_user) {
      new_user = <h4>You may submit your application now to become W.A.G.E. Certified Pending, and can return to the {this.showTrackerLink()} at any time.</h4>
    }
    var upcoming_user
    if (this.props.yearStatus != 'past') {
      upcoming_user = <span>At the end of your fiscal year, i</span>
    } else {
      upcoming_user = <span>I</span>
    }
    return (
      <div className="fee-tracker fee-tracker--new">
        <div className="fee-tracker__intro">
        {new_user}
          <h4>Use the {this.showTrackerLink()} to document each fee payment to made to an artist between {this.formatDates()}.</h4>
          <h4>{upcoming_user}f you have successfully demonstrated having paid artist fees according to <a onClick={this.props.goFeeSchedule}>W.A.G.E.’s minimum standards of compensation</a>, your organization will become W.A.G.E. Certified for fiscal year {moment(this.props.certification.fiscal_end).format('Y')}.</h4>
          <h5 className="confidentiality">* All documentation is confidential and is internally reviewed only.</h5>
        </div>
        {this.showForms()}
        {this.paymentsTable()}
      </div>
      );
    }
  });
          // <h4>{this.showQbPlLink()}</h4>