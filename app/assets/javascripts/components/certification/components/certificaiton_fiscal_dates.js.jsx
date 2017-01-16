var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
  getYears(start) {
    var start_years = []
    var end_years = []
    var today = moment(new Date)
    var start = moment(start)
    var end = moment(start).add(1, 'year').subtract(1, 'days')
    var start_before = moment(today).add(90, 'days')

    if ( end >= today && start_before >= start) {
      // input date is valid
      start_years.push(moment(start).format('Y'))
      end_years.push(moment(end).format('Y'))
    }
    if ( moment(end).add(1, 'years') >= today && start_before >= moment(start).add(1, 'years')) {
      // input date + 1 year is valid
      start_years.push(moment(start).add(1, 'years').format('Y'))
      end_years.push(moment(end).add(1, 'years').format('Y'))
    }
    if ( moment(end).subtract(1, 'years') >= today && start_before >= moment(start).subtract(1, 'years')) {
      // input date - 1 year is valid
      start_years.push(moment(start).subtract(1, 'years').format('Y'))
      end_years.push(moment(end).subtract(1, 'years').format('Y'))
    }
    return {end_years: end_years, start_years: start_years}
  },
  handleInputChange(e) {
    var changed = $(e.target).data('id')
    var newState = this.state
    newState[changed] = e.target.value
    if (changed.indexOf('s') > -1) {
      var get_years = this.getYears(moment(newState.s_y + "-" + newState.s_m + "-" + newState.s_d))
      if (get_years.start_years.length == 1) {
        newState.certification.fiscal_start = moment(get_years.start_years[0] + "-" + newState.s_m + "-" + newState.s_d).format('YYYY-MM-DD')
      } else {
        var selected = get_years.start_years.indexOf(newState.s_y)
        newState.certification.fiscal_start = moment(get_years.start_years[selected] + "-" + newState.s_m + "-" + newState.s_d).format('YYYY-MM-DD')
      }
      this.autoSetEnd(newState)
    } else {
      var end = moment(newState.e_y + "-" + newState.e_m + "-" + newState.e_d)
      var start = moment(end).subtract(1,'year').add(1, 'days')
      var get_years = this.getYears(start)
      if (get_years.end_years.length == 1) {
        newState.certification.fiscal_end = moment(get_years.end_years[0] + "-" + newState.e_m + "-" + newState.e_d).format('YYYY-MM-DD')
      } else {
        var selected = get_years.end_years.indexOf(moment(end).format('Y'))
        newState.certification.fiscal_end = moment(get_years.end_years[selected] + "-" + newState.e_m + "-" + newState.e_d).format('YYYY-MM-DD')
      }
      this.autoSetStart(newState)
    }
    newState.start_years = get_years.start_years
    newState.end_years = get_years.end_years

    this.setState({newState})
    this.handleUserUpdate(newState)
  },
  autoSetEnd(newState) {
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
    var plusYear = moment(newState.e_y + "-" + newState.e_m + "-" + newState.e_d)
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
            <h5>Start Date</h5>
            <div className="field-group">
              <div className="input-group input-group__addon select">
                <select
                  type='text'
                  data-id="s_m"
                  className='form-control'
                  value={this.state.s_m}
                  onChange={this.handleInputChange}
                  >
                    {options_months}
                  </select>
                  <div className="input-group-addon"><i className="fa fa-sort"></i></div>
                </div>
                <div className="input-group input-group__addon select">
                  <select
                    type='text'
                    data-id="s_d"
                    className="form-control"
                    value={this.state.s_d}
                    onChange={this.handleInputChange}
                    >
                    {options_start_days}
                  </select>
                  <div className="input-group-addon"><i className="fa fa-sort"></i></div>
                </div>
                <div className="input-group input-group__addon select">
                  <select
                    type='text'
                    data-id="s_y"
                    className="form-control"
                    value={this.state.s_y}
                    onChange={this.handleInputChange}
                    >
                    {options_start_years}
                  </select>
                  <div className="input-group-addon"><i className="fa fa-sort"></i></div>
                </div>
              </div>
            </div>
            <div className="col col-sm-6">
              <h5>End Date</h5>
              <div className="field-group">
                <div className="input-group input-group__addon select">
                  <select
                    type='text'
                    data-id="e_m"
                    className="form-control"
                    value={this.state.e_m}
                    onChange={this.handleInputChange}
                    >
                    {options_months}
                  </select>
                  <div className="input-group-addon"><i className="fa fa-sort"></i></div>
                </div>
                <div className="input-group input-group__addon select">
                  <select
                    type='text'
                    data-id="e_d"
                    className="form-control"
                    value={this.state.e_d}
                    onChange={this.handleInputChange}
                    >
                    {options_end_days}
                  </select>
                  <div className="input-group-addon"><i className="fa fa-sort"></i></div>
                </div>
                <div className="input-group input-group__addon select">
                  <select
                  type='text'
                  data-id="e_y"
                  className="form-control"
                  value={this.state.e_y}
                  onChange={this.handleInputChange}
                  >
                  {options_end_years}
                </select>
                <div className="input-group-addon"><i className="fa fa-sort"></i></div>
              </div>
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
        <p>Choose a current or upcoming year. Applications for previous years can be opened after this one is completed.</p>
        {fiscal_dates}
     </div>
    );
  }
});
