var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var YEAR = new Date().getFullYear()

var FiscalDates = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      certification: this.hasCertifications(),
      s_m: this.getEditDates().s_m,
      s_d: this.getEditDates().s_d,
      e_m: this.getEditDates().e_m,
      e_d: this.getEditDates().e_d,
      errors: {}
    }
  },
  hasCertifications() {
    if (this.props.certification && this.props.certification.fiscal_start) {
      return this.props.certification
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
    if (this.props.certification) {
      if (this.props.certification.fiscal_start != "" ) {
        return {
          s_m: moment(this.props.certification.fiscal_start).format('M'),
          s_d: moment(this.props.certification.fiscal_start).format('D'),
          e_m: moment(this.props.certification.fiscal_end).format('M'),
          e_d: moment(this.props.certification.fiscal_end).format('D')
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
  handleFiscalStartChange(e) {
    var changed = $(e.target).data('id')
    // var end_date = .add(2, 'hours')
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
    this.setState({ errors: {} });
    if (this.state.certification.id != null) {
      this.props.handleCertificationUpdate(this.state.certification)
      this.props.toggleEditDates()
    } else {
      this.props.handleAddCertification(this.state.certification)
    }
  },
  render() {
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
                  onClick={this.props.toggleEditDates}>
                  Edit
                </button>

    if (this.props.editDates) {
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

    var fiscal_dates_show = <h4 className="saved-dates"><span>FY: {this.props.formatDates()}</span> {actions}</h4>

    if (this.props.editDates) {
      var fiscal_dates = fiscal_dates_form
    } else {
      var fiscal_dates = fiscal_dates_show
    }

    return (
      <div id="fiscal-dates">
        {fiscal_dates}
     </div>
    );
  }
});
