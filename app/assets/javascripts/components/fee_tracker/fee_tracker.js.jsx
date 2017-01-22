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
    var subtitle
    if (this.props.yearStatus == 'future' || this.props.new_user || !this.props.certification.operating_expenses) {
      disabled = ' disabled'
      if (!this.props.certification.operating_expenses) {
        subtitle = <span className='subtitle'>* complete your <a onClick={this.props.goFiscalDetails}>Fiscal Details</a> to begin using the Fee Tracker.</span>
      }
    }
    if (this.state.showForm) {
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
  showIntro() {
    if (this.props.showIntro) {
      return (
        <FeeTrackerText
          user={this.props.user}
          new_user={this.props.new_user}
          yearStatus={this.props.yearStatus}
          certification={this.props.certification}
          goFeeSchedule={this.props.goFeeSchedule}
          toggleTracker={this.toggleTracker} />
      )
    }
  },
  render() {
    return (
      <div className="fee-tracker fee-tracker--new">
        {this.showIntro()}
        {this.showForms()}
        {this.paymentsTable()}
      </div>
      );
    }
  });