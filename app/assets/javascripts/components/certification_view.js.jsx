var menu = ['guidelines', 'contact', 'fiscal-details', 'fee-tracker', 'review', 'fee-schedule']

var CertificationView = React.createClass({
  getInitialState() {
    return {
      navPosition: 0,
      certification: this.props.certification,
      user: this.props.user,
      yearStatus: 'future',
      hasFiscalDetails: null,
      hasPayments: null,
      hasContact: null
    }
  },
  componentDidMount() {
    this.setState({
      hasFiscalDetails: this.hasFiscalDetails(),
      hasPayments: this.hasPayments(),
      hasContact: this.hasContact()
    })
  },
  // NAVIGATION
  navigateMenu(item) {
    this.setState({navPosition: item})
  },
  // CERTIFICATION STATUS
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
    return false
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
  // CONTENT OPTIONS
  printContent() {
    var content
    var position = this.state.navPosition
    if (menu[position] == 'guidelines') {
      content = <h1>guidelines</h1>
    }
    if (menu[position] == 'contact') {
      content = <h1>contact</h1>
    }
    if (menu[position] == 'fiscal-details') {
      content = <h1>fiscal-details</h1>
    }
    if (menu[position] == 'fee-tracker') {
      content = <h1>fee-tracker</h1>
    }
    if (menu[position] == 'review') {
      content = <h1>review</h1>
    }
    if (menu[position] == 'fee-schedule') {
      content = <h1>fee-schedule</h1>
    }
    return content
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