var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var YEAR = new Date().getFullYear()

var FiscalDates = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      certification: this.hasCertifications(),
      s_m: this.getEditDates().s_m,
      s_d: this.getEditDates().s_d,
      s_y: this.getEditDates().s_y,
      e_m: this.getEditDates().e_m,
      e_d: this.getEditDates().e_d,
      e_y: this.getEditDates().e_y,
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
    if ((this.props.certification.fiscal_start != "") &&  (this.props.certification.fiscal_start != null) ) {
      return {
        s_m: moment(this.props.certification.fiscal_start).format('M'),
        s_d: moment(this.props.certification.fiscal_start).format('D'),
        s_y: moment(this.props.certification.fiscal_start).format('Y'),
        e_m: moment(this.props.certification.fiscal_end).format('M'),
        e_d: moment(this.props.certification.fiscal_end).format('D'),
        e_y: moment(this.props.certification.fiscal_end).format('Y')
      }
    } else {
      return {
        s_m: '1',
        s_d: '1',
        s_y: YEAR.toString(),
        e_m: '12',
        e_d: '31',
        e_y: YEAR.toString()
      }
    }
  },
  handleInputChange(e) {
    var changed = $(e.target).data('id')
    var newState = this.state
    newState[changed] = e.target.value
    if (changed == 's_m' || changed == 's_d') {
      this.autoSetEnd(newState)
    } else {
      this.autoSetStart(newState)
    }
    this.handleUserUpdate(newState)
  },
  autoSetEnd(newState){
    var plusYear = moment(newState.s_y + "-" + newState.s_m + "-" + newState.s_d).format()
    plusYear = moment(plusYear).add(1, 'year')
    plusYear = moment(plusYear).subtract(1, 'day')
    newState.e_m = plusYear.format('M')
    newState.e_d = plusYear.format('D')
    newState.e_y = plusYear.format('Y')
    this.setState(newState)
    this.handleUserUpdate(newState)
  },
  autoSetStart(newState){
    var plusYear = moment(YEAR + "-" + newState.e_m + "-" + newState.e_d)
    plusYear = moment(plusYear).subtract(1, 'year')
    plusYear = moment(plusYear).add(1, 'day')
    newState.s_m = plusYear.format('M')
    newState.s_d = plusYear.format('D')
    newState.s_y = plusYear.format('Y')
    this.setState(newState)
    this.handleUserUpdate(newState)
  },
  FormatDates() {
    var newStartDate = this.state.s_y + "-" + this.state.s_m + "-" + this.state.s_d
    var newEndDate = this.state.e_y + "-" + this.state.e_m + "-" + this.state.e_d
    return {
      fiscal_start: newStartDate,
      fiscal_end: newEndDate
    }
  },
  handleFormatDates() {
    var newStartDate = this.FormatDates().fiscal_start
    var newEndDate = this.FormatDates().fiscal_end
    var newCertification = this.state.certification
    var newUser = this.state.user
    newUser.fiscal_start = newStartDate
    newUser.fiscal_end = newEndDate
    newCertification.fiscal_start = newStartDate
    newCertification.fiscal_end = newEndDate
    this.setState({certification: newCertification, user: newUser})
    return {certification: newCertification, user: newUser}
  },
  handleUserUpdate(user) {
    var user = this.handleFormatDates().user
    this.props.handleUserUpdate(user)
    this.setState({ errors: {} });
    if (this.state.certification.id != null) {
      this.props.handleCertificationUpdate(this.handleFormatDates().certification)
      this.props.toggleEditDates()
    } else {
      this.props.handleAddCertification(this.handleFormatDates().certification)
    }
  },
  getDays() {
    var has31 = [1, 3, 5, 7, 8, 10, 12]
    var has30 = [4, 6, 9, 11]
    if ( has31.includes(parseInt(this.state.s_m)) ) {
      var s_days = 31
    } else if ( has30.includes(parseInt(this.state.s_m)) ) {
      var s_days = 30
    } else {
      var s_days = 28
    }
    if ( has31.includes(parseInt(this.state.e_m)) ) {
      var e_days = 31
    } else if ( has30.includes(parseInt(this.state.e_m)) ) {
      var e_days = 30
    } else {
      var e_days = 28
    }
    return { s_d: s_days, e_d: e_days }
  },
  setYears() {
    var today = new Date
    var years = []
    var plusYear = ""
    var currentYear = ""
    // current year is valid
    if ( (moment(this.props.user.fiscal_start) < moment(today).add(90, 'days')) && (moment(today) < moment(this.props.user.fiscal_end)) ) {
      currentYear = moment(this.props.user.fiscal_end).format('Y')
      years.push( parseInt(currentYear) )
    }
    // if upcoming year is valid
    if (moment(this.props.user.fiscal_start).add(1, 'year') < moment(today).add(90, 'days')) {
      if (moment(this.props.user.fiscal_start).add(2, 'years').subtract(1,'days').format('Y') != currentYear) {
        plusYear = moment(this.props.user.fiscal_start).add(2, 'years').subtract(1,'days').format('Y')
        years.push( parseInt(plusYear) )
      }
    }
    var unique = years.filter( this.getUnique )
    var options = unique.map( function(year) {
     return (
        <option key={year} value={year}>
          {year}
        </option>
      )
    })
    return options
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
    var S_DAYS = [...Array(this.getDays().s_d).keys()]
    var E_DAYS = [...Array(this.getDays().e_d).keys()]
    var options_start_days = S_DAYS.map( function(i) {
      var day = i + 1
      return (
        <option key={day} value={day}>
          {day}
        </option>
      )
    });
    var options_end_days = E_DAYS.map( function(i) {
      var day = i + 1
      return (
        <option key={day} value={day}>
          {day}
        </option>
      )
    });
    var options_end_years = []
    options_end_years.push(this.state.e_y)
    options_end_years = options_end_years.map( function(i) {
      var day = i
      return (
        <option key={day} value={day}>
          {day}
        </option>
      )
    });
    // var date_save = <div id="actions">
    //         <button
    //           className="btn btn-lg save"
    //           onClick={this.handleUserUpdate}>
    //           Save
    //         </button>
    //       </div>
    // var date_edit = <button
    //               className="btn btn-sm edit"
    //               onClick={this.props.toggleEditDates}>
    //               Edit
    //             </button>

    // if (this.props.editDates) {
    //   var actions = date_save
    // } else {
    //   var actions = date_edit
    // }
    var fiscal_dates_form = <div className="form">
            <div className="col col-sm-6">
              <h4>Fiscal Period Start</h4>
              <div className="field-group">
              <select
                type='text'
                data-id="s_m"
                className="form-control"
                value={this.state.s_m}
                onChange={this.handleInputChange}
                >
                  {options_months}
                </select>
                <select
                  type='text'
                  data-id="s_d"
                  className="form-control"
                  value={this.state.s_d}
                  onChange={this.handleInputChange}
                  >
                  {options_start_days}
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
                  onChange={this.handleInputChange}
                  >
                  {options_months}
                  </select>
                  <select
                    type='text'
                    data-id="e_d"
                    className="form-control"
                    value={this.state.e_d}
                    onChange={this.handleInputChange}
                    >
                    {options_end_days}
                  </select>
                <select
                  type='text'
                  data-id="e_y"
                  className="form-control"
                  value={this.state.e_y}
                  onChange={this.handleInputChange}
                  >
                  {options_end_years}
                </select>
                </div>
            </div>
          </div>

    var fiscal_dates_show = <h4 className="saved-dates"></h4>

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
