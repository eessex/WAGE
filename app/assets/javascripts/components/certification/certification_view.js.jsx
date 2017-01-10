var menu = ['guidelines', 'contact', 'fiscal-details', 'supplemental-materials', 'fee-tracker', 'review', 'fee-schedule']

var CertificationView = React.createClass({
  getInitialState() {
    return {
      root: this.props.path,
      navPosition: 0,
      certification: this.props.certification,
      certifications: this.props.certifications,
      user: this.props.user,
      new_user: this.props.new_user,
      artist_payments: this.props.artist_payments,
      yearStatus: this.yearStatus(),
      hasCertifications: this.hasCertifications(),
      hasFiscalDetails: null,
      hasMaterials: null,
      hasPayments: null,
      hasContact: null,
      canSubmit: null,
      formattedDate: null,
      editDates: true,
      sortBy: 'date',
      sortDir: 'ASC',
      errors: {}
    }
  },
  componentDidMount() {
    var path = location.hash.replace('#','')
    var navPosition = 0
    if (path) {
      navPosition = menu.indexOf(path)
    }
    this.setState({
      hasFiscalDetails: this.hasFiscalDetails(),
      hasPayments: this.hasPayments(),
      hasContact: this.hasContact(),
      hasMaterials: this.hasMaterials(),
      canSubmit: this.canSubmit(),
      formattedDate: this.formatDates(),
      navPosition: navPosition
    })
  },
  // NAVIGATION
  navigateMenu(item) {
    this.setState({navPosition: item})
  },
  goNext(e) {
    window.location.hash = ''
    this.setState({navPosition: this.state.navPosition + 1})
  },
  goFeeSchedule() {
    if (this.state.hasCertifications) {
      this.setState({navPosition: 4})
    } else {
      this.setState({navPosition: 6})
    }
  },
  goFeeTracker() {
    if (this.state.hasCertifications) {
      this.setState({navPosition: 2})
    } else {
      this.setState({navPosition: 4})
    }
  },
  // CERTIFICATION STATUS
  hasCertifications() {
    if (this.props.certification.status > 0) {
      menu = ['guidelines', 'fiscal-details', 'fee-tracker', 'review', 'fee-schedule']
      return true
    } else {
      return false
    }
  },
  yearStatus() {
    var today = new Date
    var status
    if ( moment(this.props.certification.fiscal_start).format() > moment(today).format() ) {
      status = 'future'
    } else if ( (moment(this.props.certification.fiscal_start).format() < moment(today).format() ) && (moment(this.props.certification.fiscal_end).format() > moment(today).format()) ) {
      status = 'current'
    } else {
      status = 'past'
    }
    return status
  },
  canSubmit() {
    if (this.state.certification.status <= 2 && this.hasFiscalDetails() == 'true') {
      if (this.state.yearStatus == 'past' && this.hasPayments() == 'true') {
        return true
      } else if (
        (this.state.yearStatus == 'future' || this.state.yearStatus == 'current') &&
        (this.hasFiscalDetails() == 'true' && this.hasContact() == 'true' && this.hasMaterials() == 'true')
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
      this.state.certification.fiscal_start &&
      this.state.certification.fiscal_end ) {
      return 'true'
    } else if ( this.state.certification.operating_expenses ||
      this.state.certification.file_budget ||
      this.state.certification.fiscal_start ||
      this.state.certification.fiscal_end ) {
      return 'progress'
    } else {
      return false
    }
  },
  hasMaterials() {
    if ( this.state.user.file_501c3 &&
          this.state.user.statement &&
          this.state.certification.file_contract ) {
      return 'true'
    } else if ( this.state.user.file_501c3 ||
          this.state.user.statement ||
          this.state.certification.file_contract ) {
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
      hasContact: this.state.hasContact,
      hasMaterials: this.state.hasMaterials
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
    certification.status = 1
    this.handleCertificationUpdate(certification)
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
  handleArtistPaymentUpdate(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    artist_payments.push(artist_payment)
    this.setState({artist_payments: artist_payments})
  },
  handleSortPayments(artist_payments) {
    this.setState({artist_payments: artist_payments})
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
  sortRowsBy(e) {
    var sortDir = this.state.sortDir;
    var sortBy = $(e.target).attr('name') || $(e.target).parent().attr('name')
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
    if ($(e.target).attr('name')) {
      $(e.target).addClass('active').toggleClass('ASC')
    } else {
      $(e.target).parent().addClass('active').toggleClass('ASC')
    }
  },
  // CONTENT OPTIONS
  showNext() {
    var position = this.state.navPosition
    var next
    if (menu[position] == 'guidelines') {
      next = <a href={this.state.root + '/#' + menu[this.state.navPosition + 1]} onClick={this.goNext}>
               <button className='btn btn-lg next'>Start Application <i className='fa fa-long-arrow-right'></i></button>
             </a>
    } else if (menu[position] != 'fee-schedule' &&
        menu[position] != 'review') {
      next = <a href={this.state.root + '/#' + menu[this.state.navPosition + 1]} onClick={this.goNext}>
               <button className='btn btn-lg next'>Next <i className='fa fa-long-arrow-right'></i></button>
             </a>
    }
    return next
  },
  paymentsTable() {
    var payments
    if (this.props.artist_payments && this.props.artist_payments.length > 0) {
      payments = <div className="section artist-payments clearfix">
        <h3 className="section artist-payments__title">Artist Payments</h3>
        <ArtistPaymentsTable
          artist_payments={this.state.artist_payments}
          sortRowsBy={this.props.sortRowsBy}
          handleArtistPaymentUpdate={this.handleArtistPaymentUpdate}
          // paymentsSorted={this.props.paymentsSorted}
          isEdit="false"
          fee_categories={this.props.fee_categories} /></div>
    }
    return payments
  },
  printContent() {
    var title
    var subtitle
    var body
    var next = this.showNext()
    var position = this.state.navPosition
    if (this.state.certification.fiscal_start) {
      var fiscalYear = <h5>Fiscal Year: {this.state.formattedDate}</h5>
    }
    if (menu[position] == 'guidelines') {
      title = 'Application Guidelines'
      body = <CertificationGuidelines
              yearStatus={this.state.yearStatus} />
    }
    if (menu[position] == 'contact') {
      title = 'Contact Information'
      body = <UserContact
              user={this.state.user}
              errors={this.state.errors}
              handleUserUpdate={this.handleUserUpdate} />
    }
    if (menu[position] == 'fiscal-details') {
      title = 'Fiscal Details'
      body = <div>
              <FiscalDates
                user={this.state.user}
                certification={this.state.certification}
                new_user={this.state.new_user}
                editDates={this.state.editDates}
                formatDates={this.formatDates}
                handleCertificationUpdate={this.handleCertificationUpdate}
                handleUserUpdate={this.handleUserUpdate}
                handleAddCertification={this.handleAddCertification}/>
              <FinancialDetails
                certification={this.state.certification}
                user={this.state.user}
                certifications={this.props.certifications}
                handleCertificationUpdate={this.handleCertificationUpdate}
                canSubmit={this.state.canSubmit}
                handleUserUpdate={this.handleUserUpdate}
                new_user={this.state.new_user}
                yearStatus={this.state.yearStatus} />
              </div>
    }
    if (menu[position] == 'supplemental-materials') {
      title = 'Supplemental Materials'
      body = <CertificationMaterials
              user={this.state.user}
              certification={this.props.certification}
              handleUserUpdate={this.handleUserUpdate}
              handleCertificationUpdate={this.handleCertificationUpdate} />
    }
    if (menu[position] == 'fee-tracker') {
      title = 'Fee Tracker'
      body = <div>
            <FeeTracker
              goFeeSchedule={this.goFeeSchedule}
              certification={this.props.certification}
              fee_categories={this.props.fee_categories}
              formatted_dates={this.state.formattedDate}
              new_user={this.state.new_user}
              yearStatus={this.state.yearStatus}
              artist_payments={this.state.artist_payments}
              sortRowsBy={this.sortRowsBy}
              handleAddArtistPayment={this.handleAddArtistPayment}
              handleDeleteArtistPayment={this.handleDeleteArtistPayment}
              handleArtistPaymentUpdate={this.handleArtistPaymentUpdate}
              handleSortPayments={this.handleSortPayments}
              handleCertificationUpdate={this.handleCertificationUpdate} />
            </div>
    }
    if (menu[position] == 'review') {
      title = 'Review'
      body = <CertificationReview
          user={this.state.user}
          new_user={this.state.new_user}
          certification={this.props.certification}
          certifications={this.props.certifications}
          formatted_dates={this.state.formattedDate}
          artist_payments={this.state.artist_payments}
          yearStatus={this.state.yearStatus}
          handleSubmit={this.onCertificationSubmit}
          new_user={this.state.new_user}
          goFeeSchedule={this.goFeeSchedule}
          goFeeTracker={this.goFeeTracker}
          sortRowsBy={this.sortRowsBy}
          // paymentsSorted={this.paymentsSorted}
          // isEdit="false"
          fee_categories={this.props.fee_categories} />
    }
    if (menu[position] == 'fee-schedule') {
      var operating_expenses
      if (this.state.certification.operating_expenses) {
        operating_expenses = <h5>{'TAOE: $' + Number(this.props.certification.operating_expenses).toLocaleString()}</h5>
      } else {
        operating_expenses = <h5>* estimated for operating expenses at or under $500K</h5>
      }
      title = 'Fee Schedule'
      subtitle = <div>
                  {fiscalYear}
                  {operating_expenses}
                </div>
      body = <FeeSchedule
              user={this.state.user}
              certification={this.state.certification}
              fee_categories={this.props.fee_categories} />

    }
    return (
        <div className={'certification-view__content certification-view--' + menu[position]}>
          <div className='certification-view__header'>
            <h1>{title}</h1>
            <div className='certification-view__subtitle'>{subtitle}</div>
          </div>
          <div className='certification-view__body'>{body}</div>
          <div className='certification-view__next'>{next}</div>
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