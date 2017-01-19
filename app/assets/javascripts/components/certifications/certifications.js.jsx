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
    var canDisplay
    if (this.yearOptions().length > 0) {
      canDisplay = true
    } else {
      canDisplay = false
    }
    var format_end_date = this.yearOptions()[0] + '-' + moment(this.props.user.fiscal_end).format('M') + '-' + moment(this.props.user.fiscal_end).format('D')
    var format_start_date = moment(format_end_date).subtract(1,'years').add(1, 'days').format('YYYY-MM-DD')
    return {
      certification: {
        fiscal_start: format_start_date,
        fiscal_end: format_end_date,
        user_id: this.props.user.id,
        status: 0
      },
      e_m: moment(this.props.user.fiscal_end).format('M'),
      e_d: moment(this.props.user.fiscal_end).format('D'),
      e_y: this.yearOptions()[0],
      canDisplay: canDisplay,
      errors: {}
    }
  },
  yearOptions() {
    var d = moment(new Date())
    var certified_years = []
    this.props.certifications.map( function(certification) {
      certified_years.push(moment(certification.fiscal_end))
    })
    certified_years.push(moment(certified_years[0]).subtract(1, 'years'))
    certified_years = certified_years.sort(function(a, b){return moment(a) - moment(b)})
    if (moment(certified_years[certified_years.length - 1]).add(1, 'day') < moment(d).add(90, 'days')) {
      certified_years.push(moment(certified_years[certified_years.length - 1]).add(1, 'year'))
    }
    certified_years = certified_years.map(function(date) {
      return moment(date).format('Y')
    })
    this.props.certifications.map( function(certification) {
      var remove = moment(certification.fiscal_end).format('Y')
      certified_years = certified_years.filter(item => item !== remove);
    })
    return certified_years.sort(function(a, b){ return parseInt(b) - parseInt(a) });
  },
  handleYearChange(e) {
    if (this.yearOptions().length == 1) {
      this.handleAddCertification()
    } else {
      debugger
    }

    // newCertification.fiscal_end = newCertification.fiscal_end.replace(e_y, newDate)
    // this.setState({certification: newCertification, disabled: !this.state.disabled});
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
          <div className="input-group input-group__addon select">
            <select
              type='text'
              className="form-control"
              value={this.state.e_y}
              onChange={this.handleYearChange}
              defaultValue="default"
              >
              {options}
              </select>
              <div className="input-group-addon"><i className="fa fa-sort"></i></div>
            </div>
            <button className="btn" onClick={this.handleAddCertification}><i className="fa fa-plus"></i> New</button>
          </div>
        </div>
      )
    } else {
      return ( <span></span> )
    }
  }
});
