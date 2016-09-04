
var Certifications = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      certification: {
        fiscal_start: '',
        fiscal_end: '',
        status: false
      },
      errors: {}
    }
  },

  // handleNameChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.name = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleEmailChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.email = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleManagerChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.manager = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleHireCertification() {
  //   var that = this;
  //   $.ajax({
  //     method: 'POST',
  //     data: {
  //       certification: that.state.certification,
  //     },
  //     url: '/certifications.json',
  //     success: function(res) {
  //       var newCertificationList = that.state.certifications;
  //       newCertificationList.push(res);
  //       that.setState({
  //         certifications: newCertificationList,
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
  // handleFireCertification(certification) {
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
