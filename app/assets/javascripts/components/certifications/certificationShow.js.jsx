var CertificationShow = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments,
      sortBy: 'date',
      isFuture: false,
      canSubmit: false,
      hasFinancials: false,
      hasPayments: 'false',
      pendingPayments: false,
      contentState: 1,
      applicationStatus: this.applicationStatus(),
      sortDir: 'ASC'
    }
  },
  componentDidMount() {
    this.setState({canSubmit: this.canSubmit(), hasFinancials: this.hasFinancials(), hasPayments: this.hasPayments(), contentState: this.getContentState() })
    $('.status .item[data-id="' + this.getContentState() + '"]').addClass('active')
  },
  getContentState() {
    if (this.canSubmit()) {
      return 3
    } else if (this.state.certification.status < 2 && this.getYearStatus().future && this.hasFinancials() == "progress") {
      return 1
    } else if (this.state.certification.status < 2 && this.getYearStatus().progress && this.hasFinancials() == "true") {
      return 2
    } else {
      return 0
    }
  },
  canSubmit() {
    if (this.state.certification.status <= 2 && this.hasFinancials() == "true") {
      if (this.getYearStatus().past && this.hasPayments() == "true") {
        return true
      } else if ((this.getYearStatus().future || this.getYearStatus().progress) && (this.hasFinancials() == "true") ) {
        return true
      }
    } else {
      return false
    }
  },
  getNext() {
    var contentState
    if (this.state.contentState == 1 && this.getYearStatus().future) {
      contentState = 3
    } else {
      contentState = this.state.contentState + 1
    }
    this.setState({contentState: contentState })
    $('.status .item').removeClass('active')
    $('.status .item[data-id="' + contentState + '"]').addClass('active')
  },
  getYearStatus() {
    var d = new Date
    var future
    var past
    var progress
    if (d < Date.parse(this.state.certification.fiscal_start) ) {
      var future =  true
    }
    if (d > Date.parse(this.state.certification.fiscal_end) ) {
      past = true
    } else {
      if (d > Date.parse(this.state.certification.fiscal_start) ) {
        progress = true
      }
    }
    return {
      future: future,
      past: past,
      progress: progress
    }
  },
  hasFinancials() {
    if (this.getYearStatus().future || this.getYearStatus().past) {
      if ( this.state.certification.operating_expenses && this.state.certification.file_budget ) {
        return "true"
      } else if ( this.state.certification.operating_expenses || this.state.certification.file_contract || this.state.certification.file_budget ) {
        return "progress"
      } else {
        return "false"
      }
    }
  },
  hasPayments() {
    if ( this.state.artist_payments) {
      if (this.state.artist_payments.length > 1) {
        return 'true'
      } else if (this.state.artist_payments.length > 0) {
        return "progress"
      }
    } else {
      return 'false'
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
        var pendingPayments = false
        if (res.notice) {
          $('main').append('<div class="submit notice"><p>' + res.notice + '</p></div>')
          pendingPayments = true
          that.setState({certification: res.certification, canSubmit: that.canSubmit(), pendingPayments: pendingPayments})
          setTimeout(function () {
            window.location = "http://localhost:3000";
          },2000);
        } else {
        that.setState({certification: res.certification, canSubmit: that.canSubmit(), pendingPayments: pendingPayments})
        }
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
        that.setState({user: user, canSubmit: that.canSubmit()})
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
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D, YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
    } return formatted_date
  },
  formatOperatingExpenses() {
    return this.state.certification.operating_expenses.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  },
  getArtistPayments() {
    if (this.hasPayments() == 'progress' || this.hasPayments() == 'true') {
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
    var next = <button className="btn next" onClick={this.getNext}>Next</button>
    if (this.state.contentState == 0 && this.state.certification.status < 1) {
    var contentState = <div className="guidelines">
            <div className="intro">
              <h1><span>Application Guidelines</span></h1>
            </div>
            <Guidelines getYearStatus={this.getYearStatus}/>
            {next}
          </div>
  } else if (this.state.contentState == 0 && (this.state.certification.status == 1 || this.state.certification.status == 2)) {
    var contentState = <div className="fee-schedule">
      <div className="intro">
        <h1><span>My Fee Schedule</span></h1>
        <h5>Fiscal Year: {this.formatDates()}</h5>
      </div>
      <FeeSchedule fee_categories={this.props.fee_categories} floor_categories={this.props.fee_categories} user={this.state.user} certification={this.state.certification}/>
    </div>
  } else if (this.state.contentState == 1) {
    var contentState =  <div className="financials">
    <div className="intro">
      <h1><span>Fiscal Details</span></h1>
      <h5>Fiscal Year: {this.formatDates()}</h5>
    </div>
    <CertificationFinancials certification={this.state.certification} user={this.state.user} certifications={this.props.certifications} handleCertificationUpdate={this.handleCertificationUpdate} canSubmit={this.state.canSubmit} handleUserUpdate={this.handleUserUpdate} newUser={false} getYearStatus={this.getYearStatus} />{next}</div>
  } else if (this.state.contentState == 2) {
    if (this.props.artist_payments.length > 0) {
      var contentState =  <div>
          <AmountBox artist_payments={this.state.artist_payments} certification={this.state.certification} />
          <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} certification={this.state.certification} fee_categories={this.props.fee_categories} formatted_dates={this.formatDates} getYearStatus={this.getYearStatus}  handleCertificationUpdate={this.handleCertificationUpdate}  />
          {this.getArtistPayments()}
        </div>
    } else {
      var contentState = <div>
          <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} certification={this.state.certification} fee_categories={this.props.fee_categories} formatted_dates={this.formatDates} getYearStatus={this.getYearStatus}  handleCertificationUpdate={this.handleCertificationUpdate} />
          </div>
    }
  } else if (this.state.contentState == 3) {
    var contentState =  <div className="review">
          <div className="intro">
            <h1><span>Review</span></h1>
            <h5>Fiscal Year: {this.formatDates()}</h5>
          </div>
          <CertificationSubmitView user={this.state.user} certification={this.state.certification} certifications={this.props.certifications} artist_payment={this.state.artist_payments} isFuture={this.state.isFuture} handleSubmit={this.onCertificationSubmit} />
        </div>
  }
    return contentState
  },
  setContentState(e) {
    this.setState({contentState: $(e.target).parent().data('id'), canSubmit: this.canSubmit()})
    $('.status .item').removeClass('active')
    $(e.target).parent().addClass('active')
  },
  render() {
    if (moment(this.state.certification.fiscal_start).format('YYYY') == moment(this.state.certification.fiscal_end).format('YYYY')) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YYYY')
    } else {
      var formatted_date = moment(this.state.certification.fiscal_end).format('YYYY')
    }
    if (this.getYearStatus().future && this.state.certification.status < 2) {
      var MENU = ['guidelines', 'financials', 'artist_payments', 'review']
      var payments
    } else {
      var MENU = ['fee schedule', 'financials', 'artist_payments', 'review']
      var payments = <div className="item" data-id="2" data-complete={this.hasPayments()}>
                  <i className="fa fa-check" aria-hidden="true"></i>
                  <span onClick={this.setContentState}>Artist Payments</span>
                </div>
    }
    if (this.canSubmit()) {
      var review = <span onClick={this.setContentState} data-disabled={!this.state.canSubmit}>Review</span>
    } else {
      var review = <span data-disabled={!this.state.canSubmit}>Review</span>
    }
    var guidelines
    if (this.state.certification.status < 1) {
      guidelines = <div className="item" data-id="0">
                  <i className="fa" aria-hidden="true"></i>
                  <span onClick={this.setContentState}>Guidelines</span>
                </div>
    } else if ((this.state.certification.status == 1 || this.state.certification.status == 2) && (this.getYearStatus().future || this.getYearStatus().progress)) {
      guidelines = <div className="item" data-id="0">
                  <i className="fa" aria-hidden="true"></i>
                  <span onClick={this.setContentState}>Fee Schedule</span>
                </div>
  }

    return (
      <div id="certification" className="show">
        <div className="greeting" data-state={this.state.contentState} data-future={this.getYearStatus().future} data-progress={this.getYearStatus().progress}>
          <h4><span>Get Certified<span className="date">: FY  {formatted_date}</span></span></h4>
          <h6 className="status col-xs-12 col-sm-9 col-md-7">
          {guidelines}
          <div className="item" data-complete={this.hasFinancials()} data-id="1">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Fiscal Details</span>
          </div>
          {payments}
          <div className="item" data-id="3">
            <i className="fa fa-check" aria-hidden="true"></i>
            {review}
          </div>
          </h6>
        </div>
      <div id={MENU[this.state.contentState]} className={"content " + MENU[this.state.contentState]} data-content-state={this.state.contentState}>
        {this.contentState()}
      </div>
        <div className="status-img" data-state={this.state.certification.status}><img src="https://s3.amazonaws.com/wagency/WAGE-Pending-Logo.png"/></div>
      </div>
    )
  }
});
