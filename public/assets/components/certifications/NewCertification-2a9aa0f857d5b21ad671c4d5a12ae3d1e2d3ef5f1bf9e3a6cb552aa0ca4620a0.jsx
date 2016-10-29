var newCertification = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      certifications: this.props.certifications,
      user: this.props.user,
      artist_payments: this.props.artist_payments,
      isFuture: false,
      canSubmit: false,
      hasFinancials: false,
      hasPayments: false,
      contentState: 0,
      editDates: this.setEditDates(),
      applicationStatus: this.applicationStatus(),
      sortDir: 'ASC'
    }
  },
  componentDidMount() {
    this.setState({canSubmit: this.canSubmit(), hasFinancials: this.hasFinancials()})
  },
  canSubmit() {
    if ( this.hasFinancials() && this.hasStatement() && this.hasContact() ) {
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
  hasFinancials() {
    if ( this.state.certification.operating_expenses &&
        this.state.certification.file_990 &&
        this.state.certification.file_budget &&
        this.state.user.file_501c3 ) {
      return true
    }
  },
  hasContact() {
    if ( this.state.user.rep_name &&
        this.state.user.rep_title &&
        this.state.user.phone &&
        this.state.user.website &&
        this.state.user.address_st1 &&
        this.state.user.address_city &&
        this.state.user.address_state &&
        this.state.user.address_zip ) {
      return true
    }
  },
  hasContactProgress() {
    if (this.hasContact()) {
      return "true"
    } else if ( this.state.user.rep_name ||
        this.state.user.rep_title ||
        this.state.user.phone ||
        this.state.user.website ||
        this.state.user.address_st1 ||
        this.state.user.address_city ||
        this.state.user.address_state ||
        this.state.user.address_zip  ) {
      return "progress"
    }
  },
  hasFinancialsProgress() {
    if (this.hasFinancials()) {
      return "true"
    } else if ( this.state.certification.operating_expenses ||
        this.state.certification.file_990 ||
        this.state.certification.file_budget ||
        this.state.user.file_501c3 ) {
      return "progress"
    }
  },
  hasStatement() {
    if ( this.state.user.statement && (this.state.user.statement.length > 300) ) {
      return true
    }
  },
  hasStatementProgress() {
    if ( this.state.user.statement ) {
      if ( this.state.user.statement.length > 300 ) {
        return "true"
      } else {
        return "progress"
      }
    } else {
      return "false"
    }
  },
  applicationStatus() {
    if (this.props.certification.status != 2) {
      return 0
    } else {
      return 1
    }
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
        that.setState({certification: res, canSubmit: that.canSubmit()})
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
  handleAddCertification(certification) {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        certification: certification,
      },
      url: '/certifications.json',
      success: function(res) {
        certifications = that.state.certifications
        certifications.push(res)
        that.setState({certifications: certifications, certification: certifications[0], editDates: false})
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },
  formatDates() {
    if (this.state.certification.fiscal_start) {
      if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_start).format('Y') ) {
        var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
      } else {
        var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D, YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
      }
    } else {
      var formatted_date
    }
    return formatted_date
  },
  formatOperatingExpenses() {
    return this.state.certification.operating_expenses.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
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
  setEditDates() {
    if (this.props.user.fiscal_start) {
      return false
    } else {
      return true
    }
  },
  toggleEditDates() {
    this.setState({editDates: !this.state.editDates})
  },
  contentState() {
    if (this.state.contentState == 0) {
    var contentState = <Guidelines key="guidelines"/>

    } else if (this.state.contentState == 1) {
      var contentState =  <div className="contact">
      <div className="intro">
      <h1><span>Contact Information</span></h1>
      </div>
      <NewUserContact key="contact" user={this.state.user} handleUserUpdate={this.handleUserUpdate} /></div>

    } else if (this.state.contentState == 2) {
      var contentState =
        <div className="statement">
          <div className="intro">
            <h1><span>Statement of Intent</span></h1>
            <h4>A letter detailing your organization's interest in W.A.G.E. Certification.</h4>
          </div>
          <UserStatement user={this.state.user}/>
        </div>

    } else if (this.state.contentState == 3) {
      if (this.state.editDates || (this.state.certification && !this.state.certification.fiscal_start) ) {
        var content= <FiscalDates user={this.state.user} certification={this.state.certification} editDates={this.state.editDates} toggleEditDates={this.toggleEditDates} formatDates={this.formatDates} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} handleAddCertification={this.handleAddCertification}/>
      } else if (this.state.certification && this.state.certification.fiscal_start) {
        var content = <div><FiscalDates user={this.state.user} certification={this.state.certification} editDates={this.state.editDates} toggleEditDates={this.toggleEditDates} formatDates={this.formatDates} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} handleAddCertification={this.handleAddCertification}/>
        <CertificationFinancials certification={this.state.certification} user={this.state.user} newUser={this.props.newUser} certifications={this.state.certifications.length} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} />
        </div>
      }
      var d = new Date();
      var current_year = d.getFullYear();
      var contentState =
      <div className="financials">
        <div className="intro">
          <h1><span>Fiscal Details: {current_year}</span></h1>
        </div>
        {content}
      </div>
    } else if (this.state.contentState == 4) {
        var contentState =  <div className="review">
              <div className="intro">
                <h1><span>Review</span></h1>
                <h4>FY: {this.formatDates()}</h4>
              </div>
              <CertificationSubmitView user={this.state.user} certification={this.state.certification} certifications={this.props.certifications} artist_payment={this.state.artist_payments} isFuture={this.state.isFuture} handleSubmit={this.onCertificationSubmit}/>
            </div>
      }
    return contentState
  },
  setContentState(e) {
    if (!$(e.target).data('disabled') == true) {
      this.setState({contentState: $(e.target).parent().data('id'), canSubmit: this.canSubmit(this.state.certification, this.state.user)})
      $('.status .item').removeClass('active')
      $(e.target).parent().addClass('active')
    }
  },
  render() {
    if (moment(this.state.certification.fiscal_start).format('YYYY') == moment(this.state.certification.fiscal_end).format('YYYY')) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YYYY')
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('YY') + "-" + moment(this.state.certification.fiscal_end).format('YY')
    }
    // if (this.state.isFuture) {
    //   var payments
    // } else {
    //   var payments = <div className="item" data-id="2" data-complete={this.hasPayments()}>
    //               <i className="fa fa-check" aria-hidden="true"></i>
    //               <span onClick={this.setContentState}>Artist Payments</span>
    //             </div>
    // }
    return (
      <div id="certification" className="show">
        <div className="greeting" data-state={this.state.contentState}>
          <h4><span>Get Certified: FY  {formatted_date}</span></h4>
          <h6 className="status col-xs-12 col-sm-9 col-md-7 ">
          <div className="item" data-id="0">
            <i className="fa" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Guidelines</span>
          </div>
          <div className="item" data-complete={this.hasContactProgress()} data-id="1">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Contact Info</span>
          </div>
          <div className="item" data-complete={this.hasStatementProgress()} data-id="2">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Statement</span>
          </div>
          <div className="item" data-complete={this.hasFinancialsProgress()} data-id="3">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Fiscal Details</span>
          </div>
          <div className="item" data-id="4">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState} data-disabled={!this.state.canSubmit}>Review</span>
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
