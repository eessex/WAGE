var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var YEAR = new Date().getFullYear()

var FiscalDates = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      certification: this.hasCertifications(),
      editDates: this.setEdit(),
      editCertification: false,
      s_m: this.getEditDates().s_m,
      s_d: this.getEditDates().s_d,
      e_m: this.getEditDates().e_m,
      e_d: this.getEditDates().e_d,
      errors: {}
    }
  },
  hasCertifications() {
    if (this.props.certifications[0]) {
      return this.props.certifications[0]
    } else {
      return {
        fiscal_start: '',
        fiscal_end: '',
        user_id: this.props.user.id,
        status: 0
      }
    }
  },
  getEditDates() {
    if (this.props.certifications[0]) {
      if (this.props.certifications[0].fiscal_start != "" ) {
        return {
          s_m: moment(this.props.certifications[0].fiscal_start).format('M'),
          s_d: moment(this.props.certifications[0].fiscal_start).format('D'),
          e_m: moment(this.props.certifications[0].fiscal_end).format('M'),
          e_d: moment(this.props.certifications[0].fiscal_end).format('D')
        }
      }
    } else {
      return {
        s_m: '1',
        s_d: '1',
        e_m: '12',
        e_d: '31'
      }
    }
  },
  setEdit() {
    if (this.props.user.fiscal_start) {
      return false
    } else {
      return true
    }
  },
  toggleEdit() {
    this.setState({editDates: !this.state.editDates})
  },
  handleFiscalStartChange(e) {
    var changed = $(e.target).data('id')
    this.setState({[changed]: e.target.value});
  },
  handleFiscalEndChange(e) {
    var changed = $(e.target).data('id')
    this.setState({[changed]: e.target.value});
  },
  handleFormatDates() {
    var newStartDate = YEAR + "-" + this.state.s_m + "-" + this.state.s_d
    var newEndDate = YEAR + "-" + this.state.e_m + "-" + this.state.e_d
    var newCertification = this.state.certification
    var newUser = this.state.user
    newUser.fiscal_start = newStartDate
    newUser.fiscal_end = newEndDate
    newCertification.fiscal_start = newStartDate
    newCertification.fiscal_end = newEndDate
    this.setState({certification: newCertification, user: newUser});
  },
  handleUserUpdate() {
    this.handleFormatDates()
    this.props.handleUserUpdate(this.state.user)
    this.setState({
      editDates: false,
      editCertification: true,
      errors: {}
    });
    if (this.state.certification.id != null) {
      this.props.handleCertificationUpdate(this.state.certification)
    } else {
      this.handleAddCertification()
    }
  },
  handleAddCertification() {
    this.props.handleAddCertification(this.state.certification)
  },
  handleCertificationUpdate() {
    this.props.handleCertificationUpdate(this.state.certification)
  },
  render() {
    var that = this;
    var disabled = that.state.disabled ? 'disabled' : ''
    var options_months = MONTHS.map( function(month, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {month}
        </option>
      )
    });
    var DAYS = [...Array(31).keys()]
    var options_days = DAYS.map( function(i) {
      var day = i + 1
      return (
        <option key={day} value={day}>
          {day}
        </option>
      )
    });
    var date_save = <div id="actions">
            <button
              className="btn btn-lg save"
              onClick={this.handleUserUpdate}>
              Save
            </button>
          </div>
    var date_edit = <button
                  className="btn btn-sm edit"
                  onClick={this.toggleEdit}>
                  Edit
                </button>

    if (this.state.editDates) {
      var actions = date_save
    } else {
      var actions = date_edit
    }
    var fiscal_dates_form = <div className="form">
            <div className="col col-sm-6">
              <h4>Fiscal Period Start</h4>
              <div className="field-group">
              <select
                type='text'
                data-id="s_m"
                className="form-control"
                value={this.state.s_m}
                onChange={this.handleFiscalStartChange}
                >
                  {options_months}
                </select>
                <select
                  type='text'
                  data-id="s_d"
                  className="form-control"
                  value={this.state.s_d}
                  onChange={this.handleFiscalStartChange}
                  >
                  {options_days}
                </select>
              </div>
            </div>
            <div className="col col-sm-6">
              <h4>Fiscal Period End</h4>
              <div className="field-group">
                <select
                  type='text'
                  data-id="e_m"
                  className="form-control"
                  value={this.state.e_m}
                  onChange={this.handleFiscalEndChange}
                  >
                  {options_months}
                  </select>
                  <select
                    type='text'
                    data-id="e_d"
                    className="form-control"
                    value={this.state.e_d}
                    onChange={this.handleFiscalEndChange}
                    >
                    {options_days}
                  </select>
                </div>
            </div>
            {actions}
          </div>
      if (moment(this.state.user.fiscal_start).format('Y') == moment(this.state.user.fiscal_end).format('Y')) {
        var format_start = moment(this.state.user.fiscal_start).format('MMM D')
      } else {
        var format_start = moment(this.state.user.fiscal_start).format('MMM D, Y')
      }
      var fiscal_dates_show = <h4 className="saved-dates"><span>{format_start} - {moment(this.state.user.fiscal_end).format('MMM D, Y')}</span> {actions}</h4>

    if (this.state.editDates) {
      var fiscal_dates = fiscal_dates_form
      var certification = ""
    } else {
      var fiscal_dates = fiscal_dates_show
      var certification = <CertificationFinancials certification={this.state.certification} user={this.props.user} handleCertificationUpdate={this.props.handleCertificationUpdate} handleUserUpdate={this.props.handleUserUpdate} onNext={this.props.onNext} onBack={this.props.onBack} />
    }

    return (
      <div id="fiscal-dates">
        <div className="col-xs-12">
          <h2><span>Fiscal Details</span></h2>
          {fiscal_dates}
          {certification}
        </div>
     </div>
    );
  }
});
