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
    if (this.props.yearStatus == 'future' || this.props.yearStatus == 'current') {
      disabled = ' disabled'
    }
    if (this.state.showForm) {
      if (this.props.yearStatus == 'current' && this.props.new_user == true) {
        disabled = ''
      }
      return (
        <div className={'fee-tracker__payments new-form' + disabled}>
          <div className='title'>
            <h3>Create A New Payment</h3>
            <h6 onClick={this.toggleQbPl}>Upload Quickbooks File</h6>
          </div>
          <FeeTrackerNew
            new_user={this.state.new_user}
            yearStatus={this.state.yearStatus}
            certification={this.props.certification}
            fee_categories={this.props.fee_categories}
            handleAddArtistPayment={this.props.handleAddArtistPayment} />
        </div>
      )
    } else {
      var subtitle
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
  showTrackerLink() {
    var link
    if (this.props.yearStatus == 'future') {
      if (this.state.showForm) {
        link = <span>Once your fiscal year has started, you are required to create an entry</span>
      } else {
        link = <span>Once your fiscal year has started, you are required to <a onClick={this.toggleTracker}>create an entry</a></span>
      }
    } else if (!this.state.showForm) {
      link = <a onClick={this.toggleTracker}>Create an entry</a>
    } else {
      link = <span>Create an entry</span>
    }
    return link
  },
  showCurrentNewUser() {
    var current_message
    if (this.props.new_user && this.props.yearStatus == 'current') {
      current_message = <span>You do not need to complete the fee tracker until your fiscal year has ended. </span>
    }
    return current_message
  },
  showQbPlLink() {
    var link
    if (this.state.showForm) {
      link = <span>Alternatively, you may <a onClick={this.toggleQbPl}>upload a Quickbooks P&L.</a></span>
    } else {
      link = <span>Alternatively, you may upload a Quickbooks P&L.</span>
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
  introText() {
    var intro
    if (this.props.new_user) {
      intro = <h4>Using the Fee Tracker you can add documentation of fee payment anytime during the fiscal year, including after the fiscal year has ended.</h4>
    }
    return intro
  },
  render() {
    return (
      <div className="fee-tracker fee-tracker--new">
        <div className="fee-tracker__intro">
          <h4 className="can-have-payments">Organizations must demonstrate having paid artist fees according to <a onClick={this.props.goFeeSchedule}>W.A.G.E.’s minimum standards of compensation</a> at the end of each fiscal year.</h4>
          <h4>{this.introText()}</h4>
          <h4>Once you have successfully demonstrated having paid fees, your organization will become W.A.G.E. Certified for that fiscal year.</h4>
          <h4>{this.showTrackerLink()} for each fee payment to an artist between {this.props.formatted_dates}. {this.showCurrentNewUser()}{this.showQbPlLink()}</h4>
        </div>
        {this.showForms()}
        {this.paymentsTable()}
      </div>
      );
    }
  });
