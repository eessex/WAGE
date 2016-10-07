var STATUS = ['guidelines', 'contact', 'fiscal-details', 'statement', 'review', 'submit'];
var Dashboard = React.createClass({
  getInitialState() {
    var i = 0;
    return {
      application_progress: 1,
      certification_progress: i,
      certifications: this.props.certifications,
      certification: this.props.certifications[0],
      // fee_categories: this.props.artist_payments,
      user: this.props.user,
      canSubmit: false,
      errors: {}
    }
  },
  handleCertificationUpdate(certification) {
    debugger
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: certification,
      },
      url: '/certifications/' + certification.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          certification: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleUserUpdate(user) {
    var that = this;
      $.ajax({
        method: 'PATCH',
        data: {
          user: user,
        },
        url: '/users' + '.json',
        success: function(res) {
          that.setState({
            editDates: false,
            editCertification: true,
            errors: {}
          });
        },
        error: function(res) {
          that.setState({errors: res.responseJSON.errors});
        }
      });
  },
  canSubmit() {
    if (this.state.user.rep_name
        && this.state.user.rep_title
        && this.state.user.email
        && this.state.user.phone
        && this.state.user.website
        && this.state.user.address_st1
        && this.state.user.address_city
        && this.state.user.address_state
        && this.state.user.address_zip
        && this.state.user.fiscal_start
        && this.state.user.fiscal_end
        && this.state.user.statement
        && this.state.certifications.length > 0
        && this.state.certifications[0].operating_expenses
        && this.state.certifications[0].file_990
        && this.state.certifications[0].file_budget) {
      return true
    } else {
      return false
    }

  },
  componentDidMount() {
    this.setState({canSubmit: this.canSubmit() })
  },
  onNext() {
    this.setState({certification_progress: this.state.certification_progress + 1 })
    console.log('status updated')
  },
  revealNext() {
    var button = <button className="btn next" onClick={this.onNext}>Next</button>
    return button
  },
  onBack() {
    if (this.state.certification_progress <= 1) {
      var certification_progress = 0
    } else {
      var certification_progress = this.state.certification_progress - 1
    }
    this.setState({certification_progress: certification_progress })
    console.log('status: ' + this.state.certification_progress)
  },
  btn() {
    var back = <button className="btn col-xs-3 back" onClick={this.onBack}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</button>
    var next = <button className="btn col-xs-3 next" onClick={this.onNext}>Next <i className="fa fa-chevron-right" aria-hidden="true"></i></button>
    if (this.state.certification_progress < 1) {
      var back = <div></div>
    }
    if (this.state.certification_progress == 4)  {
      var next = <div></div>
    }
    if (this.state.application_progress < 1) {
      var btn = ""
    } else {
      var btn = <div className="actions">{back}{next}</div>
    }
    return btn
  },
  handleSubmit() {
    certification = this.props.certifications[0]
    certification.status = 1
    this.handleCertificationUpdate(certification)
    window.location.pathname = "/certifications/" + this.props.certifications[0].id
    this.setState({application_progress: 2 })
  },
  setProgress(e) {
    var certification_progress = parseInt(e.target.textContent.split(". ")[0]) - 1
    this.setState({certification_progress: certification_progress })
  },
  getFeeCategories() {
    this.setState({certification_progress: 5 })
  },
  greeting() {
    if (this.state.application_progress == 1) {
      var greeting =
      <div className="greeting">
        <h4>Get Certified</h4>
        <h6 data-state={this.state.application_progress} className={"status col-xs-12 col-md-9 col-lg-7 " + STATUS[this.state.certification_progress]}><span onClick={this.setProgress}>1. Guildelines</span><span onClick={this.setProgress}>2. Contact</span><span onClick={this.setProgress}>3. Fiscal Details</span><span onClick={this.setProgress}>4. Statement of Intent</span><span onClick={this.setProgress}>5. Review</span></h6>
        <button className="btn btn-sm" onClick={this.getFeeCategories}>Fee Schedule</button>
      </div>
    } else {
      var greeting = <div className="greeting"><h4>Dashboard: {this.state.user.institution_name}</h4></div>
    }
    return greeting
  },
  render() {
    if (this.state.application_progress == 1) {

      var flash;
      if (this.state.certification_progress == 0) {
        var dashboard =  <Guidelines key="new-user-contact"/>
      } else if (this.state.certification_progress == 1) {
        var dashboard =  <NewUserContact key="new-user-contact" user={this.state.user} onNext={this.onNext} onBack={this.onBack} revealNext={this.revealNext}/>
      } else if (this.state.certification_progress == 2) {
        var dashboard = <FiscalDates user={this.state.user} certifications={this.props.certifications} handleCertificationUpdate={this.handleCertificationUpdate} handleUserUpdate={this.handleUserUpdate} Next={this.onNext} onBack={this.onBack}/>
      } else if (this.state.certification_progress == 3) {
        var dashboard = <UserStatement user={this.state.user} onNext={this.onNext} onBack={this.onBack}/>
      } else if (this.state.certification_progress == 4) {
        var dashboard = <CertificationSubmitView user={this.state.user} certification={this.state.certifications[0]} artist_payment={this.state.artist_payments} handleSubmit={this.handleSubmit} onNext={this.onNext} onBack={this.onBack}/>
      } else if (this.state.certification_progress == 5) {
        var dashboard = <FeeSchedule fee_categories={this.props.fee_categories} floor_categories={this.props.fee_categories} user={this.state.user} certification={this.state.certification}/>
      }
    } else if (this.state.certification && this.state.certification.status != 0) {
      var flash = <div><h3>Thank you, your application has been received.</h3></div>
      var dashboard = <CertificationShow certification={this.state.certifications[0]} />
    }
    return (
      <div className="dashboard">
        {this.greeting()}
        <div id="dashboard" className="col-xs-12 col-md-9 col-lg-7">
          {flash}
          {dashboard}
          {this.btn()}
        </div>
      </div>
    );
  }
});
