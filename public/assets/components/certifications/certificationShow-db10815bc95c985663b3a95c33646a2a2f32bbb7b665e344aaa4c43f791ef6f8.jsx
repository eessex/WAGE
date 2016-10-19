var CertificationShow = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments,
      sortBy: 'date',
      isFuture: false,
      canSubmit: false,
      contentState: 0,
      applicationStatus: this.applicationStatus(),
      sortDir: 'ASC'
    }
  },
  componentDidMount() {
    this.setState({isFuture: this.isFuture(), canSubmit: this.canSubmit(this.state.certification, this.state.user)})
  },
  canSubmit(certification, user) {
    if (
      this.isFuture() &&
      certification.file_990 &&
      certification.file_budget &&
      certification.operating_expenses &&
      user.file_501c3
    ) {
      return true
    } else {
      return false
    }
  },
  isFuture() {
    if (new Date < Date.parse(this.state.certification.fiscal_start) ) {
      return true
    } else {
      return false
    }
  },
  applicationStatus() {
    if (this.props.certification.status != 2) {
      return 0
    } else {
      return 1
    }
  },
  _sortRowsBy(event) {
    var sortDir = this.state.sortDir;
    var sortBy = event.target.className.split(' ')[0];
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir == 'ASC' ? 'DESC' : 'ASC';
    } else {
     sortDir = 'ASC';
    }
    var artist_payments = this.state.artist_payments.slice();
    artist_payments.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }
      if (sortDir === 'DESC') {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });
    this.setState({sortBy, sortDir});
    this.setState({artist_payments: artist_payments});
    $('th').removeClass('active')
    $(event.target).addClass('active').toggleClass('ASC')
  },
  handleAddArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments
    artist_payments.push(artist_payment)
    this.setState({artist_payments: artist_payments})
  },
  handleDeleteArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    this.setState({artist_payments: artist_payments})
  },
  onCertificationSubmit() {
    var certification = this.state.certification
    certification.status = 2
    this.handleCertificationUpdate(certification)
  },
  handleCertificationUpdate(certification) {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: certification,
      },
      url: '/certifications/' + certification.id + '.json',
      success: function(res) {
        that.setState({certification: res, canSubmit: that.canSubmit(certification, that.state.user)})
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleUserUpdate(user) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      data: {
        user: user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({user: user, canSubmit: that.canSubmit(that.state.certification, user)})
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  paymentsSorted(artist_payments) {
    this.setState({artist_payments: artist_payments});
  },
  formatDates() {
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_start).format('Y') ) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    } return formatted_date
  },
  formatOperatingExpenses() {
    return this.state.certification.operating_expenses.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  },
  getArtistPayments() {
    if (this.state.artist_payments) {
      var payments = <ArtistPaymentsTable artist_payments={this.state.artist_payments} _sortRowsBy={this._sortRowsBy} paymentsSorted={this.paymentsSorted} handleDeleteArtistPayment={this.handleDeleteArtistPayment} fee_categories={this.props.fee_categories}/>
    } else {
      var payments
    }
    return payments
  },
  actions() {
    if (!this.state.canSubmit) {
      var disabled = true
    } else {
      var disabled = false
    }
    var actions = <div id="actions" className="col-xs-12"><button disabled={disabled} className="btn btn-lg save" onClick={this.onCertificationSubmit}>Submit</button></div>
    return actions
  },
  contentState() {
    if (this.state.contentState == 0) {
    var contentState = <Guidelines key="new-user-contact"/>
  } else if (this.state.contentState == 1) {
    var contentState =  <div><h1><span>Fiscal Details</span></h1><CertificationFinancials certification={this.state.certification} user={this.state.user} certifications={this.props.certifications} handleCertificationUpdate={this.handleCertificationUpdate} canSubmit={this.state.canSubmit} handleUserUpdate={this.handleUserUpdate} isFuture={this.state.isFuture} /></div>
  } else if (this.state.contentState == 2) {
    var contentState =  <div>
        <AmountBox artist_payments={this.state.artist_payments} certification={this.state.certification} />
        <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} certification={this.state.certification} fee_categories={this.props.fee_categories} formatted_dates={this.formatDates}/>
        {this.getArtistPayments()}
      </div>
  } else if (this.state.contentState == 3) {
    var contentState =  <div>
          <h1><span>Review</span></h1>
          <CertificationSubmitView user={this.state.user} certification={this.state.certification} artist_payment={this.state.artist_payments} />
        </div>
  }
    return contentState
  },
  setContentState(e) {
    this.setState({contentState: $(e.target).parent().data('id'), canSubmit: this.canSubmit(this.state.certification, this.state.user)})
    $('.status .item').removeClass('active')
    $(e.target).parent().addClass('active')

  },
  render() {
    if (moment(this.state.certification.fiscal_start).format('YYYY') == moment(this.state.certification.fiscal_end).format('YYYY')) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YYYY')
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YY') + "-" + moment(this.state.certification.fiscal_end).format('YY')
    }
    // if (this.state.certification.status >= 2) {
    return (
      <div id="certification" className="show">
        <div className="greeting">
          <h4><span>Get Certified: FY  {formatted_date}</span></h4>
          <h6 className="status col-xs-12 col-sm-9 col-md-7 ">
          <div className="item" data-id="0">
            <i className="fa" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Guidelines</span>
          </div>
          <div className="item" data-id="1">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Fiscal Details</span>
          </div>
          <div className="item" data-id="2">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Artist Payments</span>
          </div>
          <div className="item" data-id="3">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Review</span>
          </div>
          </h6>
        </div>
      <div className="content" data-content-state={this.state.contentState}>
        {this.contentState()}
      </div>
        <div className="status-img"><img src="https://s3.amazonaws.com/wagency/WAGE-Pending-Logo.png"/></div>
      </div>
    )
  // } else {
  //   return (
  //     <div id="certification" className="show">
  //       <h3><span className="title">New Certification: FY  {moment(this.state.certification.fiscal_start).format('YYYY')}</span></h3>
  //       <div className="new col-xs-12 col-sm-9 col-md-7">
  //       <CertificationFinancials certification={this.state.certification} user={this.state.user} certifications={this.props.certifications} handleCertificationUpdate={this.handleCertificationUpdate} canSubmit={this.state.canSubmit} handleUserUpdate={this.handleUserUpdate} isFuture={this.state.isFuture} />
  //       {this.actions()}
  //       </div>
  //     </div>
  //   )
  // }
  }
});
