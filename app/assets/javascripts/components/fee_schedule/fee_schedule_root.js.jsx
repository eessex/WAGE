var menu = ['guidelines', 'contact', 'fiscal-details', 'materials', 'fee-tracker', 'review', 'fee-schedule']

var FeeScheduleRoot = React.createClass({
	getInitialState() {
    this.hasCertifications()
		return {
      fee_categories: this.props.fee_categories,
      certification: this.props.certification,
      certifications: this.props.certifications,
      new_user: this.props.new_user,
      user: this.props.user,
      navPosition: menu.length
		}
	},
  hasCertifications() {
    if (this.props.certification.status > 0) {
      menu = ['guidelines', 'fiscal-details', 'fee-tracker', 'review', 'fee-schedule']
      return true
    } else {
      return false
    }
  },
  navigateMenu(item) {
    window.location = "http://localhost:3000/#" + menu[item]
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
      hasFiscalDetails: this.hasFiscalDetails(),
      hasPayments: this.hasPayments(),
      hasContact: this.hasContact()
    }
  },
	render() {
		var items
		if (this.props.new_user) {
			var progress = this.getProgress()
			items = <CertificationMenu menu={menu}
            navigateMenu={this.navigateMenu}
            navPosition={this.state.navPosition}
            getProgress={progress} />
		}
		return (
			<div className='fee-schedule'>
				{items}
				<h1>Fee Schedule</h1>
				<FeeSchedule certification={this.props.certification} fee_categories={this.props.fee_categories} />
			</div>
		)
	}
})