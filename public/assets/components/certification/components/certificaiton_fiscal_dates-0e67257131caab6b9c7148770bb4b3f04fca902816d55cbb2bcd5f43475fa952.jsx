var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var YEAR = new Date().getFullYear()

var FiscalDates = React.createClass({
  getInitialState() {
    var dates = this.getEditDates()
    var getYears = this.getYears(this.props.certification.fiscal_start)
    return {
      user: this.props.user,
      certification: this.props.certification,
      s_m: dates.s_m,
      s_d: dates.s_d,
      s_y: dates.s_y,
      e_m: dates.e_m,
      e_d: dates.e_d,
      e_y: dates.e_y,
      start_years: getYears.start_years,
      end_years: getYears.end_years,
      errors: {}
    }
  },
  componentDidMount() {
    year = this.dateIsValid('s_y')
    var newState = this.state
    this.autoSetEnd(newState)
    this.handleUserUpdate(newState)
  },
  getEditDates() {
    return {
      s_m: moment(this.props.certification.fiscal_start).format('M'),
      s_d: moment(this.props.certification.fiscal_start).format('D'),
      s_y: moment(this.props.certification.fiscal_start).format('Y'),
      e_m: moment(this.props.certification.fiscal_end).format('M'),
      e_d: moment(this.props.certification.fiscal_end).format('D'),
      e_y: moment(this.props.certification.fiscal_end).format('Y')
    }
  },
  handleInputChange(e) {
    var changed = $(e.target).data('id')
    var newState = this.state
    newState[changed] = e.target.value
    if (changed == 's_m' || changed == 's_d' || changed == 's_y') {
      var s_year = this.dateIsValid(changed)
      var e_year = this.dateIsValid(changed, false)
      newState.s_y = s_year
      newState.e_y = e_year
      this.autoSetEnd(newState)
    } else {
      var year = this.dateIsValid(changed, false)
      newState.e_y = year
      this.autoSetStart(newState)
    }
    this.handleUserUpdate(newState)
  },
  dateIsValid(changed, start=true) {
    var year
    var newStart = moment(this.state.s_y + "-" + this.state.s_m + "-" + this.state.s_d).format()
    var valid_years = this.getYears(newStart)
    if (start) {
      if (valid_years.start_years.includes(this.state[changed])) {
        year = this.state.s_y
      } else if (valid_years[1]) {
        debugger
      } else {
        year = valid_years[0]
      }
    } else {
      // is end
      if (valid_years.end_years.includes(this.state[changed])) {
        year = this.state.e_y
      } else if (valid_years[1]) {
        debugger
      } else {
        year = valid_years[0]
      }
    }
    return year
  },
  autoSetEnd(newState) {
    var plusYear = moment(newState.s_y + "-" + newState.s_m + "-" + newState.s_d).format()
    plusYear = moment(plusYear).add(1, 'year')
    plusYear = moment(plusYear).subtract(1, 'day')
    // var allYears = this.getYears(plusYear)
    newState.e_m = plusYear.format('M')
    newState.e_d = plusYear.format('D')
    newState.e_y = plusYear.format('Y')
    // newState.start_years = allYears.start_years
    // newState.end_years = allYears.end_years
    this.setState(newState)
    this.handleUserUpdate(newState)
  },
  autoSetStart(newState){
    var plusYear = moment(YEAR + "-" + newState.e_m + "-" + newState.e_d)
    plusYear = moment(plusYear).subtract(1, 'year')
    plusYear = moment(plusYear).add(1, 'day')
    // var allYears = this.getYears(plusYear)
    newState.s_m = plusYear.format('M')
    newState.s_d = plusYear.format('D')
    newState.s_y = plusYear.format('Y')
    // newState.start_years = allYears.start_years
    // newState.end_years = allYears.end_years
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
    var handleFormatDates = this.handleFormatDates()
    this.props.handleUserUpdate(handleFormatDates.user)
    this.props.handleCertificationUpdate(handleFormatDates.certification)
    this.setState({certification: handleFormatDates.certification, user: handleFormatDates.user, errors: {}})
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
  getUnique(value, index, self) {
    return self.indexOf(value) === index;
  },
  getYears(start) {
    var today = new Date
    var possible = []
    var start_years = []
    var end_years = []
    possible.push(moment(start))

    var new_start = moment(start).subtract(2, 'years')
    possible.push(new_start)
    new_start = moment(start).subtract(1, 'years')
    possible.push(new_start)
    new_start = moment(start).add(1, 'years')
    possible.push(new_start)
    new_start = moment(start).add(2, 'years')
    possible.push(new_start)

    possible.forEach(function(start) {
      var end = moment(start).add(1, 'year').subtract(1, 'day')
      var validEnd_current = moment(today).subtract(90, 'days')
      var validEnd_future = moment(today).add(1, 'year')
      var validStart = moment(today).add(90, 'days')
      if (end >= moment(today).subtract(90, 'days') && end < today) {
        // date is recent
        console.log(moment(start).format('Y') + " is recent")
        start_years.push(moment(start).format('Y'))
        end_years.push(moment(end).format('Y'))
      } else if (start <= today && end >= today) {
        // date is current
        console.log(moment(start).format('Y') + " is current")
        start_years.push(moment(start).format('Y'))
        end_years.push(moment(end).format('Y'))
      } else if (start <= moment(today).add(90, 'days') && start > today) {
        // date is upcoming
        console.log(moment(start).format('Y') + " is upcoming")
        start_years.push(moment(start).format('Y'))
        end_years.push(moment(end).format('Y'))
      } else {
        // date is far future or past
        console.log(moment(start).format('Y') + " NOT VALID")
      }
    });
    return {end_years: end_years, start_years: start_years}
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
    var options_start_years
    var options_end_years
    options_end_years = this.state.end_years.map( function(i) {
      var day = i
      return (
        <option key={day} value={day}>
          {day}
        </option>
      )
    });
    options_start_years = this.state.start_years.map( function(i) {
      var day = i
      return (
        <option key={day} value={day}>
          {day}
        </option>
      )
    });
    var fiscal_dates_form = <div className="financials financials--fiscal-dates">
            <div className="col col-sm-6">
              <h6>Start Date</h6>
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
                <select
                  type='text'
                  data-id="s_y"
                  className="form-control"
                  value={this.state.s_y}
                  onChange={this.handleInputChange}
                  >
                  {options_start_years}
                </select>
              </div>
            </div>
            <div className="col col-sm-6">
              <h6>End Date</h6>
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
        <h4>Fiscal Period</h4>
        <p>Choose a current or upcoming fiscal year. Applications for previous years can be opened after this application is completed.</p>
        {fiscal_dates}
     </div>
    );
  }
});
