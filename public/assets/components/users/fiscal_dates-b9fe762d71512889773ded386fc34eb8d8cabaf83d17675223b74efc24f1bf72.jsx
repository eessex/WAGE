MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var FiscalDates = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      certification: this.hasCertifications(),
      editDates: this.setEdit(),
      editCertification: false,
      errors: {}
    }
  },
  hasCertifications() {
    if (this.props.certifications) {
      return this.props.certifications[0]
    } else {
      return {
        fiscal_start: '',
        fiscal_end: '',
        status: 0
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
    var newUser = this.state.user
    newUser.fiscal_start = e.target.value
    this.setState({user: newUser});
  },

  handleFiscalEndChange(e) {
    var newUser = this.state.user
    newUser.fiscal_end = e.target.value
    this.setState({user: newUser});
  },
  handleUserUpdate() {
    var that = this;
    $.ajax({
      method: 'PATCH',
      data: {
        user: that.state.user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.handleAddDates(that.state.user)
        that.setState({
          editDates: false,
          editCertification: true,
          errors: {}
        });
        that.handleAddCertification()
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleAddDates(user) {
    var start_date
    var end_date
    MONTHS.map( function(month, i) {
      var index = i + 1
      if (index == user.fiscal_start) {
        start_date = new Date(month + " 1 " + new Date().getFullYear())
        end_date = new Date(start_date - 1)
        end_date.setFullYear(end_date.getFullYear() + 1)
        end_date = moment(end_date).format('Y-MM-DD')
        start_date = moment(start_date).format('Y-MM-DD')
      }
    });
    this.setState({certification: { user_id: this.props.user.id, fiscal_start: start_date, fiscal_end: end_date } })
  },
  handleAddCertification() {
    var that = this;
    debugger
    $.ajax({
      method: 'POST',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications.json',
      success: function(res) {
        debugger
        that.setState({
          certification: res,
          errors: {}
        });
      },
      error: function(res) {
        debugger
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },
  handleCertificationUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications/' + that.state.certification.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          certification: res
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  render() {
    var that = this;
    var disabled = that.state.disabled ? 'disabled' : ''
    var options = MONTHS.map( function(month, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {month}
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
    var fiscal_dates_form = <div><table className="form">
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <td className="field-group">
            <select
              type='text'
              className="form-control"
              value={this.state.user.fiscal_start}
              onChange={this.handleFiscalStartChange}
              >
              {options}
              </select>
              <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
            </td>
            <td>
            <select
              type='text'
              className="form-control"
              value={this.state.user.fiscal_end}
              onChange={this.handleFiscalEndChange}
              >
              {options}
              </select>
              <span style={{color: 'red'}}>{this.state.errors.fiscal_end}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {actions}
      </div>
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_end).format('Y')) {
      var format_start = moment(this.state.certification.fiscal_start).format('MMM')
    } else {
      var format_start = moment(this.state.certification.fiscal_start).format('MMM Y')
    }
    var fiscal_dates_show = <h4><span>{format_start} - {moment(this.state.certification.fiscal_end).format('MMM Y')}</span> {actions}</h4>

    if (this.state.editDates) {
      var fiscal_dates = fiscal_dates_form
      var certification = ""
    } else {
      var fiscal_dates = fiscal_dates_show
      var certification = <CertificationFinancials certification={this.state.certification} user={this.state.user} onNext={this.props.onNext} onBack={this.props.onBack} />
    }

    return (
      <div id="fiscal-dates">
        <div className="col-xs-12">
          <h2><span>2. Fiscal Year</span></h2>
          {fiscal_dates}
          {certification}
        </div>
     </div>
    );
  }
});
