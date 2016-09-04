var Certifications = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      certification: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    }
  },

  // handleNameChange(e) {
  //   var newEmployee = this.state.certification
  //   newEmployee.name = e.target.value
  //   this.setState({certification: newEmployee});
  // },
  //
  // handleEmailChange(e) {
  //   var newEmployee = this.state.certification
  //   newEmployee.email = e.target.value
  //   this.setState({certification: newEmployee});
  // },
  //
  // handleManagerChange(e) {
  //   var newEmployee = this.state.certification
  //   newEmployee.manager = e.target.value
  //   this.setState({certification: newEmployee});
  // },
  //
  // handleHireEmployee() {
  //   var that = this;
  //   $.ajax({
  //     method: 'POST',
  //     data: {
  //       certification: that.state.certification,
  //     },
  //     url: '/certifications.json',
  //     success: function(res) {
  //       var newEmployeeList = that.state.certifications;
  //       newEmployeeList.push(res);
  //       that.setState({
  //         certifications: newEmployeeList,
  //         certification: {
  //           name: '',
  //           email: '',
  //           manager: false
  //         },
  //         errors: {}
  //       });
  //     },
  //     error: function(res) {
  //       that.setState({errors: res.responseJSON.errors})
  //     }
  //   });
  // },
  //
  // handleFireEmployee(certification) {
  //   var certificationList = this.state.certifications.filter(function(item) {
  //     return certification.id !== item.id;
  //   });
  //   this.setState({certifications: certificationList});
  // },

  render() {
    var that = this;
    certifications = this.state.certifications.map( function(certification) {
      return (
        <Certification certification={certification} key={certification.id}  />
      );
    });
    return (
      <div>
        <h1>Certifications</h1>
        <div id="certifications">
          <table>
            <thead>
              <tr>
                <th>Fiscal Start</th>
                <th>Fiscal End</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {certifications}
              <tr>
                <td>
                  <input type="text" value={this.state.certification.fiscal_start} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
                </td>
                <td>
                  <input value={this.state.certification.fiscal_end} type="text" /><br />
                  <span style={{color: 'red'}}>{this.state.errors.fiscal_end}</span>
                </td>
                <td><input value={this.state.certification.status} type="checkbox"  /></td>
                <td><button onClick={this.handleHireEmployee}>New</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
