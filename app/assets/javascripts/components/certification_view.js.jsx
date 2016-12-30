var menu = ['guidelines', 'contact', 'fiscal-details', 'statement', 'fee-tracker', 'review', 'fee-schedule']

var CertificationView = React.createClass({
  getInitialState() {
    return {
      navPosition: 0,
      certification: this.props.certification,
      user: this.props.user,
      newUser: this.props.newUser,
      yearStatus: 'future',
      hasFiscalDetails: null,
      hasPayments: null,
      hasContact: null,
      canSubmit: null,
      formattedDate: null,
      errors: {}
    }
  },
  componentDidMount() {
    this.setState({
      hasFiscalDetails: this.hasFiscalDetails(),
      hasPayments: this.hasPayments(),
      hasContact: this.hasContact(),
      canSubmit: this.canSubmit(),
      formattedDate: this.formatDates()
    })
  },
  // NAVIGATION
  navigateMenu(item) {
    this.setState({navPosition: item})
  },
  // CERTIFICATION STATUS
  canSubmit() {
    if (this.state.certification.status <= 2 && this.hasFiscalDetails() == 'true') {
      if (this.state.yearStatus == 'past' && this.hasPayments() == 'true') {
        return true
      } else if (
        (this.state.yearStatus == 'future' || this.state.yearStatus == 'progress') &&
        (this.hasFiscalDetails() == 'true')
        ) {
        return true
      }
    } else {
      return false
    }
  },
  hasFiscalDetails() {
    if ( this.state.certification.operating_expenses &&
      this.state.certification.file_budget &&
      this.state.certification.file_contract &&
      this.state.user.file_501c3 ) {
      return 'true'
    } else if ( this.state.certification.operating_expenses ||
      this.state.certification.file_budget ||
      this.state.certification.file_contract ||
      this.state.user.file_501c3 ) {
      return 'progress'
    } else {
      return false
    }
  },
  hasPayments() {
    if ( this.state.artist_payments ) {
      if (this.state.artist_payments.length > 1) {
        return 'true'
      } else if (this.state.artist_payments.length > 0) {
        return "progress"
      }
    } else if ( this.state.certification.qb_pl ) {
      return 'true'
    } else {
      return false
    }
  },
  hasContact() {
    if (
      ( this.state.user.rep_name && this.state.user.rep_name.length > 3 ) &&
        ( this.state.user.rep_title && this.state.user.rep_title.length > 3 ) &&
        ( this.state.user.phone && this.state.user.phone.length == 12 ) &&
        this.state.user.website &&
        ( this.state.user.address_st1 && this.state.user.address_st1.length > 3 ) &&
        ( this.state.user.address_city && this.state.user.address_city.length > 3 ) &&
        this.state.user.address_state &&
        ( this.state.user.address_zip && this.state.user.address_zip.length == 5)
      ) {
      return 'true'
    } else if ( this.state.user.rep_name ||
        this.state.user.rep_title ||
        this.state.user.phone ||
        this.state.user.website ||
        this.state.user.address_st1 ||
        this.state.user.address_city ||
        this.state.user.address_state ||
        this.state.user.address_zip  ) {
      return 'progress'
    } else {
      return false
    }
  },
  getProgress() {
    return {
      hasFiscalDetails: this.state.hasFiscalDetails,
      hasPayments: this.state.hasPayments,
      hasContact: this.state.hasContact
    }
  },
  isSaved() {
    $('.is-saved').toggleClass('saving')
    if ($('.is-saved span').text() == 'Saving') {
      $('.is-saved span').text('Saved')
    } else {
      $('.is-saved span').text('Saving')
    }
    $('.is-saved i').toggleClass('fa-check fa-spinner fa-spin')
  },
  // SAVE & UPDATE
  handleUserUpdate(user) {
    this.isSaved()
    var that = this;
    $.ajax({
      method: 'PATCH',
      data: {
        user: user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({user: user, canSubmit: that.canSubmit(), errors: {}})
        setTimeout(function(){
          that.isSaved()
        }, 150)
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
        setTimeout(function(){
          that.isSaved()
        }, 150)
      }
    });
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
        if (res.notice) {
          $('main').append('<div class="submit notice"><p>' + res.notice + '</p></div>')
          that.setState({certification: res, canSubmit: that.canSubmit()})
          setTimeout(function () {
            window.location = "http://localhost:3000";
          },2000);
        } else {
          that.setState({certification: res, canSubmit: that.canSubmit()})
        }
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleAddCertification(certification) {
    this.isSaved()
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        certification: certification,
      },
      url: '/certifications.json',
      success: function(res) {
        setTimeout(function(){
          that.isSaved()
        }, 150)
        certifications = that.state.certifications
        certifications.push(res)
        that.setState({certifications: certifications, certification: res, errors: {}})
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },
  onCertificationSubmit() {
    var certification = this.state.certification
    certification.status = 2
    this.handleCertificationUpdate(certification)
  },
  // FORMAT HELPERS
  formatDates() {
    var formatted_date
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_end).format('Y') ) {
      formatted_date = moment(this.state.certification.fiscal_start).format('MMM D') + " - " + moment(this.state.certification.fiscal_end).format('MMM D, YYYY');
    } else {
      formatted_date = moment(this.state.certification.fiscal_start).format('MMM D, YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMM D, YYYY');
    }
    return formatted_date
  },
  // CONTENT OPTIONS
  printContent() {
    var title
    var subtitle
    var body
    var position = this.state.navPosition
    if (menu[position] == 'guidelines') {
      title = <h1>Application Guidelines</h1>
      body = <CertificationGuidelines
              yearStatus={this.state.yearStatus}/>
    }
    if (menu[position] == 'contact') {
      title = <h1>Contact Information</h1>
      body = <UserContact
              user={this.state.user}
              errors={this.state.errors}
              handleUserUpdate={this.handleUserUpdate} />
    }
    if (menu[position] == 'fiscal-details') {
      title = <div className='title'>
                <h1>Fiscal Details</h1>
                <h5>Fiscal Year: {this.state.formattedDate}</h5>
              </div>
      body = <FiscalDetails
              certification={this.state.certification}
              user={this.state.user}
              certifications={this.props.certifications}
              handleCertificationUpdate={this.handleCertificationUpdate}
              canSubmit={this.state.canSubmit}
              handleUserUpdate={this.handleUserUpdate}
              newUser={this.state.newUser}
              yearStatus={this.state.yearStatus} />
    }
    if (menu[position] == 'statement') {
      title = <h1>Statement of Intent</h1>
      body = <UserStatement
              user={this.state.user}
              handleUserUpdate={this.handleUserUpdate} />
    }
    if (menu[position] == 'fee-tracker') {
      title = <h1>Fee Tracker</h1>
    }
    if (menu[position] == 'review') {
      title = <h1>Review</h1>
    }
    if (menu[position] == 'fee-schedule') {
      title = <h1>Fee Schedule</h1>
    }
    return (
        <div className={'certification-view__content certification-view--' + menu[position]}>
          {title}{body}
        </div>
      )
  },
  render() {
    var progress = this.getProgress()
    return (
        <div>
          <CertificationMenu menu={menu}
            navigateMenu={this.navigateMenu}
            navPosition={this.state.navPosition}
            getProgress={progress} />
          {this.printContent()}
        </div>
    );
  }
});