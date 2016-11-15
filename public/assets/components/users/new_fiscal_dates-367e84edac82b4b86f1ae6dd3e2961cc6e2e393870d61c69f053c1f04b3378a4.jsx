var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var today = new Date
var YEARS = [moment(today).format('Y'), moment(today).add(1, 'years').format('Y')]

var NewFiscalDates = React.createClass({
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
    if (this.props.certification && (this.props.certification.fiscal_start != "") && (this.props.certification.fiscal_start != null) ) {
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
        s_y: moment(new Date).format('Y'),
        e_m: '12',
        e_d: '31',
        e_y: moment(new Date).format('Y')
      }
    }
  },
  getYears() {
    debugger
    var years = YEARS
    if (moment(this.state.s_y + "-" + this.state.s_m + "-" + this.state.s_d).format() > moment(today).add(90, 'days').format()) {
      var index = years.indexOf(this.state.s_y);
      debugger
      if (index > -1) {
        years.splice(index, 1);
      }
    } else if (moment((parseInt(this.state.s_y) + 1) + "-" + this.state.s_m + "-" + this.state.s_d).format() > moment(today).add(90, 'days').format()) {
      var index = years.indexOf(this.state.s_y);
      debugger
      if (index > -1) {
        years.splice(index, 1);
      }
    }
    // if (moment(this.state.s_y + "-" + this.state.s_m + "-" + this.state.s_d) < moment(this.state.e_y + "-" + this.state.e_m + "-" + this.state.e_d)) {
    //
    // }
    // var plusEndYear = parseInt(this.state.e_y) + 1
    // var today = moment(new Date).format()
    // if (moment(this.state.s_y + "-" + this.state.s_m + "-" + this.state.s_d) < moment(today).add(90, 'days') ) {
    //   debugger
    //   YEARS.push(this.state.s_y)
    // }
    // if (moment(this.state.e_y + "-" + this.state.e_m + "-" + this.state.e_d) < moment(today).add(1, 'year') ) {
    //   YEARS.push(this.state.e_y)
    // }
    // if (moment(plusEndYear + "-" + this.state.e_m + "-" + this.state.e_d) < moment(today).add(455, 'days') ) {
    //   YEARS.push(this.state.e_y)
    //   debugger
    // }
    // add the chosen end date if it is greater than now
    // if (moment(this.FormatDates().fiscal_end) > moment(today)) {
    //     YEARS.push(this.state.e_y)
    // }
    // // add a year from chosen end date if it is greater than now
    // if (moment(this.FormatDates().fiscal_end).add(1, 'years') < moment(today)) {
    //   YEARS.push(moment(this.FormatDates().fiscal_end).add(1, 'years').format('Y'))
    // }
    // // add start date if it is less than now + 90 days
    // if (moment(this.FormatDates().fiscal_start) < moment(today).add(90, 'days')) {
    //     YEARS.push(this.state.s_y)
    // }
    // // add a year from start date if it is less than now + 90 days
    // if (moment(this.FormatDates().fiscal_start).add(1, 'years')  < moment(today).add(90, 'days')) {
    //     YEARS.push(moment(this.FormatDates().fiscal_start).add(1, 'years').format('Y'))
    // }
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    var unique = YEARS.filter( onlyUnique )
    if (moment(this.FormatDates().fiscal_end) < moment(today) ) {
      debugger
      unique = unique.pop(moment(this.FormatDates().fiscal_end).format('Y'))
    }
    // years.push(moment(today).format('Y'))
    // years.push(moment(today).add(1, 'years').format('Y'))

    // if (this.props.certification.fiscal_end) {
    //   years.push(moment(this.props.user.fiscal_end).format('Y'))
    //   if ( moment(today).format('Y') != moment(this.props.user.fiscal_end).add(1, 'years').format('Y') ) {
    //     if ( moment(this.props.user.fiscal_start).add(1, 'years') <= moment(today).add(91, 'days') ) {
    //       years.push(moment(this.props.user.fiscal_start).add(1, 'years').format('Y'))
    //     }
    //   }
    // }
    // years.push(moment(today).format('Y'))
    // years.push(moment(today).add(1, 'years').format('Y'))
    // years.push(moment(today).format('Y'))
    // var constructedDate = this.state.s_y + "-" + this.state.s_m + "-" + this.state.s_d
    // if (moment(constructedDate).add(1, 'years') <= moment(today).add(91, 'days')
    //     && moment(constructedDate).add(1, 'years').format('Y') != moment(today).format('Y') ) {
    //   years.push(moment(today).add(1, 'years').format('Y'))
    // }
    return unique
  },
  handleFiscalStartChange(e) {
    var changed = $(e.target).data('id')
    this.setState({[changed]: e.target.value});
    var newState = this.state
    newState[changed] = e.target.value
    this.autoSetEnd(newState)
  },
  handleFiscalEndChange(e) {
    var changed = $(e.target).data('id')
    this.setState({[changed]: e.target.value});
    var newState = this.state
    newState[changed] = e.target.value
    this.autoSetStart(newState)
  },
  autoSetEnd(newState){
    var plusYear = moment(newState.s_y + "-" + newState.s_m + "-" + newState.s_d)
    plusYear.add(1, 'year')
    plusYear.subtract(1, 'day')
    this.setState({e_m: plusYear.format('M'),
     e_d: plusYear.format('D'), e_y: plusYear.format('Y')})
    this.getYears()
  },
  autoSetStart(newState){
    var plusYear = moment(newState.e_y + "-" + newState.e_m + "-" + newState.e_d)
    plusYear.subtract(1, 'year')
    plusYear.add(1, 'day')
    this.setState({s_m: plusYear.format('M'),
     s_d: plusYear.format('D'), s_y: plusYear.format('Y')})
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
  handleUserUpdate() {
    var user = this.handleFormatDates().user
    this.props.handleUserUpdate(user)
    this.setState({ errors: {} });
    if (this.state.certification.id != null) {
      this.props.handleCertificationUpdate(this.handleFormatDates().certification)
      this.props.toggleEditDates()
    } else {
      if (this.props.handleAddCertification) {
        this.props.handleAddCertification(this.state.certification)
      }
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
  handleYearChange(e) {
    var e_y = moment(this.state.certification.fiscal_end).format('Y')
    var s_y = moment(this.state.certification.fiscal_start).format('Y')
    var newCertification = this.state.certification
    if (e_y != e.target.value) {
      var diff = parseInt(e.target.value) - parseInt(e_y)
      if (moment(newCertification.fiscal_start).format('Y') == moment(newCertification.fiscal_end).format('Y')) {
        newCertification.fiscal_start = newCertification.fiscal_start.replace(e_y, e.target.value)
      } else {
        var newSdate = parseInt(s_y) + diff
        newCertification.fiscal_start = newCertification.fiscal_start.replace(s_y, newSdate)
      }
      newCertification.fiscal_end = newCertification.fiscal_end.replace(e_y, e.target.value)
      this.setState({certification: newCertification});
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
    var S_DAYS = [...Array(this.getDays().s_d).keys()]
    var E_DAYS = [...Array(this.getDays().e_d).keys()]
    var years = this.getYears()
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
    var options_years = years.map( function(year) {
      return (
        <option key={year} value={year}>
          {year}
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
                    {options_end_days}
                  </select>
                  <select
                    type='text'
                    data-id="e_y"
                    className="form-control"
                    value={this.state.e_y}
                    onChange={this.handleFiscalEndChange}
                    >
                    {options_years}
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

var NewCertificationYear = React.createClass({
  getInitialState() {
    return {
      certification: {
        fiscal_start: this.props.user.fiscal_start,
        fiscal_end: this.props.user.fiscal_end,
        user_id: this.props.user.id,
        status: 0
      },
      e_y: moment(this.props.user.fiscal_end).format('Y'),
      errors: {}
    }
  },
  handleYearChange(e) {
    var e_y = moment(this.state.certification.fiscal_end).format('Y')
    var s_y = moment(this.state.certification.fiscal_start).format('Y')
    var newCertification = this.state.certification
    if (e_y != e.target.value) {
      var diff = parseInt(e.target.value) - parseInt(e_y)
      if (moment(newCertification.fiscal_start).format('Y') == moment(newCertification.fiscal_end).format('Y')) {
        newCertification.fiscal_start = newCertification.fiscal_start.replace(e_y, e.target.value)
      } else {
        var newSdate = parseInt(s_y) + diff
        newCertification.fiscal_start = newCertification.fiscal_start.replace(s_y, newSdate)
      }
      newCertification.fiscal_end = newCertification.fiscal_end.replace(e_y, e.target.value)
      this.setState({certification: newCertification});
    }
  },
  getYears() {
    var years = []
    var today = moment(new Date).format()
    years.push(moment(this.props.user.fiscal_start).format('Y'))
    if (moment(this.props.user.fiscal_start).add(1, 'years') < moment(today).add(91, 'days') &&     moment(this.props.user.fiscal_start).add(1, 'years') != moment(this.props.user.fiscal_start).format('Y')) {
      years.push(moment(this.props.user.fiscal_start).add(1, 'years').format('Y'))
    }
    return years
  },
  handleAddCertification() {
    this.props.handleAddCertification(this.state.certification)
  },
  render() {
    var years = this.getYears()
    var options = years.map( function(year, i) {
      var index = i + 1
      return (
        <option key={index} value={year}>
          {year}
        </option>
      )
    });

    return (
    <div className="select-year">
    <h4>Start my certification in year:</h4>
    <div className="field-group">
      <select
        type='text'
        className="form-control"
        value={moment(this.state.certification.fiscal_end).format('Y')}
        onChange={this.handleYearChange}
        >
        {options}
        </select>
        <button className="btn" onClick={this.handleAddCertification}>Save</button>
      </div>
      <h4>You can select an upcoming year if it starts within 90 days.</h4>
      <h4>You may apply for previous fiscal years after completing your first application.</h4>
    </div>
    )
  }
})
