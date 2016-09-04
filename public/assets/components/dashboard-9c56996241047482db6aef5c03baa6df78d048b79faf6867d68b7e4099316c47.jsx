
var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      certification: {
        fiscal_start: '',
        fiscal_end: '',
        status: 0
      },
      errors: {}
    }
  },
  // handleFiscalStartChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.fiscal_start = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleFiscalEndChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.fiscal_end = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleStatusChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.status = e.target.value
  //   this.setState({certification: newCertification});
  // },
  // handleAddCertification() {
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
  //           fiscal_start: '',
  //           fiscal_end: '',
  //           status: 0
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
  // handleDeleteCertification(certification) {
  //   var certificationList = this.state.certifications.filter(function(item) {
  //     return certification.id !== item.id;
  //   });
  //   this.setState({certifications: certificationList});
  // },

  render() {
    // var that = this;
    // certifications = this.state.certifications.map( function(certification) {
    //   return (
    //     <Certification certification={certification} key={certification.id} onDeleteCertification={that.handleDeleteCertification} />
    //   );
    // });
    return (
      <div>
        <h1>Dashboard</h1>
        <div id="dashboard">
          <Certifications certifications={this.state.certifications} />
        </div>
      </div>
    );
  }
});
