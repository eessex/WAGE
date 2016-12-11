var Certifications = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      user: this.props.user,
      errors: {}
    }
  },
  addCertification(certification) {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        certification: certification
      },
      url: '/certifications.json',
      success: function(res) {
        debugger
        window.location.pathname = "/certifications/" + res.id
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },
  //
  handleDeleteCertification(certification) {
    // var certificationList = this.state.certifications.filter(function(certification) {
    //   return certification.id !== certification.id;
    // });
    // this.setState({certifications: certificationList});
    console.log('here')
  },

  render() {
    var that = this;
    certifications = this.props.certifications.map( function(certification) {
      return (
        <Certification certification={certification} key={certification.id} onDeleteCertification={that.handleDeleteCertification} />
      );
    });
    return (
      <div id="certifications">
        <CertificationNew user={this.props.user} certifications={this.props.certifications} addCertification={this.addCertification}/>
        {certifications}
      </div>
    );
  }
});

var CertificationNew = React.createClass({
  getInitialState() {
    if (this.yearOptions().length > 0) {
      var canDisplay = true
    } else {
      var canDisplay = false
    }
    return {
      certification: {
        fiscal_start: this.props.user.fiscal_start,
        fiscal_end: this.props.user.fiscal_end,
        user_id: this.props.user.id,
        status: 0
      },
      s_m: moment(this.props.user.fiscal_start).format('M'),
      s_d: moment(this.props.user.fiscal_start).format('D'),
      s_y: moment(this.props.user.fiscal_start).format('Y'),
      e_m: moment(this.props.user.fiscal_end).format('M'),
      e_d: moment(this.props.user.fiscal_end).format('D'),
      e_y: moment(this.props.user.fiscal_end).format('Y'),
      disabled: true,
      canDisplay: canDisplay,
      errors: {}
    }
  },
  yearOptions() {
    var d = new Date()
    var years = []
    for (var i = 2014; i <= d.getFullYear() + 1; i++) {
      years.push(i)
    }
    this.props.certifications.map( function(certification) {
      var remove = parseInt(moment(certification.fiscal_end).format('Y'))
      years = years.filter(item => item !== remove);
    })
    return years.sort(function(a, b){return b-a});
  },
  handleYearChange(e) {
    if (e.target.value != "default") {
      var e_y = moment(this.state.certification.fiscal_end).format('Y')
      var s_y = moment(this.state.certification.fiscal_start).format('Y')
      var newCertification = this.state.certification
      if (parseInt(e_y) > parseInt(e.target.value)) {
        var diff = parseInt(e_y) - parseInt(e.target.value)
        var newDate = parseInt(e_y) - diff
      }
      if (moment(newCertification.fiscal_start).format('Y') == moment(newCertification.fiscal_end).format('Y')) {
        newCertification.fiscal_start = newCertification.fiscal_start.replace(e_y, newDate)
      } else {
        var newSdate = parseInt(s_y) - diff
        newCertification.fiscal_start = newCertification.fiscal_start.replace(s_y, newSdate)
      }
      newCertification.fiscal_end = newCertification.fiscal_end.replace(e_y, newDate)
      this.setState({certification: newCertification, disabled: !this.state.disabled});
    }
  },
  handleAddCertification() {
    this.props.addCertification(this.state.certification)
  },
  render() {
    var years = this.yearOptions()
    var options = years.map( function(year, i) {
      var index = i + 1
      return (
        <option key={index} value={year}>
          {year}
        </option>
      )
    });
    if (this.state.canDisplay == true) {
      return (
        <div className="new">
        <div className="field-group">
          <select
            type='text'
            className="form-control"
            value={this.state.e_y}
            onChange={this.handleYearChange}
            defaultValue="default"
            >
            <option className="default" value="default">Choose Year</option>
            {options}
            </select>
            <button className="btn" disabled={this.state.disabled} onClick={this.handleAddCertification}><i className="fa fa-plus"></i> New</button>
          </div>
        </div>
      )
    } else {
      return ( <span></span> )
    }
  }
});
// <div className="title" data-toggle="collapse" data-target="#certifications" href="#certifications">
//   <h2><span>Applications</span></h2>
// </div>
// <div id="certifications" className="certifications view collapse">
//   <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
//   <div className="header">
//     <h4>Complete an application for each fiscal year in which your organization wishes to be certified.</h4>
//   </div>
//   <FiscalDates user={this.props.user}/>
// <div>
// <div id="certifications">
//   <div className="new">
//     <table className="form">
//       <thead>
//         <tr>
//           <th>Fiscal Start</th>
//           <th>Fiscal End</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>
//             <input
//             type="date"
//             value={this.state.certification.name}
//             onChange={this.handleFiscalStartChange}
//             className="form-control" />
//             <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
//           </td>
//           <td>
//             <input
//             value={this.state.certification.fiscal_end}
//             type="date"
//             className="form-control"
//             onChange={this.handleFiscalEndChange} />
//             <span style={{color: 'red'}}>{this.state.errors.fiscal_end}</span>
//           </td>
//           <td>
//             <button
//               className="btn"
//               onClick={this.handleAddCertification}>
//               New
//             </button>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
//   {certifications}
// </div>
// </div>
// </div>
