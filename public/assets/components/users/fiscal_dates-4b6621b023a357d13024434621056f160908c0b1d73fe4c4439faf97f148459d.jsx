MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var FiscalDates = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      editMode: true,
      errors: {}
    }
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
        that.setState({
          errors: {}
        });
        that.props.onNext()
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },


  render() {
    var that = this;
    var options = MONTHS.map( function(month, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {month}
        </option>
      )
    })
    return (
      <div className="fiscal-dates">
        <h1><span>Fiscal Year</span></h1>
          <table className="form">
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
                  <td>
                    <button
                      className="btn"
                      onClick={this.handleUserUpdate}>
                      Next
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    );
  }
});
