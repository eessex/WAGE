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
    if ( this.state.user.statement && (this.state.user.statement.length > 3) ) {
      return true
    }
  },
  hasStatementProgress() {
    if ( this.state.user.statement ) {
        return "true"
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
    certification.status = 1
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
        if (res.notice) {
          $('main').append('<div class="submit notice"><p>' + res.notice + '</p></div>')
          setTimeout(function () {
            window.location = "http://localhost:3000";
          },2000);
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
  handleNewCertification(e) {
    var year = $(e.target).parent().find('select').val()
    var newCertification = this.state.certification
    var fiscal_start = this.state.user.fiscal_start
    var fiscal_end = this.state.user.fiscal_end
    if (moment(fiscal_end).format('Y') != year) {
      if (moment(fiscal_start).format('Y') == moment(fiscal_end).format('Y')) {
        newCertification.fiscal_start = fiscal_start.replace(moment(fiscal_start).format('Y'), e.target.value)
      }
    } else {
      newCertification.fiscal_start = fiscal_start
      newCertification.fiscal_end = fiscal_end
    }
    this.handleAddCertification(newCertification)
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
        debugger
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
      if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_end).format('Y') ) {
        var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
      } else {
        var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D, YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
      }
    } else {
      var formatted_date = moment(new Date).format('Y')
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
  viewFeeSchedule() {
    this.setState({contentState: 5})
    $('.status .item').removeClass('active')
  },
  feeSchedule() {
    if (this.state.certification.operating_expenses != null) {
      var btn = <button className="btn fee-schedule" onClick={this.viewFeeSchedule}>My Fee Schedule</button>
    }
    return btn
  },
  setEditDates() {
    if (this.props.user.fiscal_start) {
      return false
    } else {
      return true
    }
  },
  getYearStatus() {
    return { future: false, past: false, progress: false, newUser: true }
  },
  toggleEditDates() {
    this.setState({editDates: !this.state.editDates})
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
  contentState() {
    if (this.state.contentState == 3 && !this.state.canSubmit) {
      var next = <button className="btn next" disabled="true" onClick={this.getNext}>Next <i className="fa fa-chevron-right"></i></button>
    } else {
      var next = <button className="btn next" onClick={this.getNext}>Next <i className="fa fa-chevron-right"></i></button>
    }
    if (this.state.contentState == 0) {
    var contentState = <div className="guidelines">
                <div className="intro">
                  <h1><span>Application Guidelines</span></h1>
                </div>
                <Guidelines key="guidelines" getYearStatus={this.getYearStatus}/>
                {next}
              </div>
    } else if (this.state.contentState == 1) {
      var contentState =  <div className="contact">
      <div className="intro">
      <h1><span>Contact Information</span></h1>
      </div>
      <NewUserContact key="contact" user={this.state.user} handleUserUpdate={this.handleUserUpdate} />{next}</div>

    } else if (this.state.contentState == 3) {
      var contentState =
        <div className="statement">
          <div className="intro">
            <h1><span>Statement of Intent</span></h1>
          </div>
          <UserStatement user={this.state.user}/>
          {next}
        </div>

    } else if (this.state.contentState == 2) {
      if (this.state.editDates || (this.state.certification && !this.state.certification.fiscal_start) ) {
        if (!this.state.certification.fiscal_start && !this.state.certification.fiscal_end) {
          var today = new Date
          var years = []
          var plusYear = ""
          var currentYear = ""
          function getUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          // current year is valid
          if ( (moment(this.state.user.fiscal_start) < moment(today).add(90, 'days')) && (moment(today) < moment(this.state.user.fiscal_end)) ) {
            currentYear = moment(this.state.user.fiscal_end).format('Y')
            years.push( parseInt(currentYear) )
          }
          // if upcoming year is valid
          if (moment(this.state.user.fiscal_start).add(1, 'year') < moment(today).add(90, 'days')) {
            if (moment(this.state.user.fiscal_start).add(2, 'years').subtract(1,'days').format('Y') != currentYear) {
              plusYear = moment(this.state.user.fiscal_start).add(2, 'years').subtract(1,'days').format('Y')
              years.push( parseInt(plusYear) )
            }
          }
          var unique = years.filter( getUnique )
          console.log(unique)
          var options = unique.map( function(year) {
           return (
              <option key={year} value={year}>
                {year}
              </option>
            )
          })
          var content = <div>
            <h4>Start my certification in: </h4>
            <div className="form certification-year">
            <h4><select className="form-control">
              {options}
            </select></h4>
            <button className="btn btn-lg" onClick={this.handleNewCertification}>Next</button>
            </div>
            <h4>You can apply for certification in additional years once your first application is complete.</h4>
          </div>
        } else {
          var content = <FiscalDates user={this.state.user} certification={this.state.certification} editDates="true" toggleEditDates={this.toggleEditDates} formatDates={this.formatDates} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} handleAddCertification={this.handleAddCertification} getYearStatus={this.getYearStatus}/>
        }
      } else if (this.state.certification && this.state.certification.fiscal_start) {
        var content = <div><FiscalDates user={this.state.user} certification={this.state.certification} editDates={this.state.editDates} toggleEditDates={this.toggleEditDates} formatDates={this.formatDates} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} handleAddCertification={this.handleAddCertification}/>
        <CertificationFinancials certification={this.state.certification} user={this.state.user} newUser="true" certifications={this.state.certifications.length} canSubmit={this.canSubmit} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} getYearStatus={this.getYearStatus}/>
        {next}
        </div>
      }
      var d = new Date();
      var current_year = d.getFullYear();
      var formatDates
      if (this.state.certification.fiscal_start != null && !this.state.editDates) {
        formatDates = <h5>Fiscal Year: {this.formatDates()}</h5>
      }
      var contentState =
      <div className="financials">
        <div className="intro">
          <h1><span>Fiscal Details</span></h1>
          {formatDates}
        </div>
        {content}
      </div>
    } else if (this.state.contentState == 4) {
        var contentState =  <div className="review">
              <div className="intro">
                <h1><span>Review</span></h1>
                {formatDates}
              </div>
              <CertificationSubmitView user={this.state.user} certification={this.state.certification} certifications={this.props.certifications} artist_payment={this.state.artist_payments} isFuture={this.state.isFuture} handleSubmit={this.onCertificationSubmit}/>
            </div>
      } else if (this.state.contentState == 5) {
          contentState = <div className="review">
                <div className="intro">
                  <h1><span>Fee Schedule</span></h1>
                  {formatDates}
                </div>
                <FeeSchedule user={this.state.user} certification={this.state.certification} fee_categories={this.props.fee_categories} />
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
    var formatted_date
    if (this.state.certification.fiscal_start != null && this.state.certification.fiscal_end != null) {
      formatted_date = ": FY  " + moment(this.state.certification.fiscal_end).format('YYYY')
    }
    return (
      <div id="certification" className="show">
        <div className="greeting" data-state={this.state.contentState}>
          <h4><span>Get Certified</span></h4>
          <h6 className="status col-xs-12 col-sm-9 col-md-7 ">
          <div className="item" data-id="0">
            <i className="fa" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Guidelines</span>
          </div>
          <div className="item" data-complete={this.hasContactProgress()} data-id="1">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Contact Info</span>
          </div>
          <div className="item" data-complete={this.hasFinancialsProgress()} data-id="2">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Fiscal Details</span>
          </div>
          <div className="item" data-complete={this.hasStatementProgress()} data-id="3">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState}>Statement</span>
          </div>
          <div className="item" data-id="4">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span onClick={this.setContentState} data-disabled={!this.state.canSubmit}>Review</span>
          </div>
          </h6>
          {this.feeSchedule()}
        </div>
      <div className="content" data-content-state={this.state.contentState}>
        {this.contentState()}
      </div>

      </div>
    )
  }
});
