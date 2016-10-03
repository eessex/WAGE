var STATUS = ['contact', 'fiscal-details', 'statement', 'review', 'submit']
var i = 0
var Dashboard = React.createClass({
  getInitialState() {
    return {
      application_progress: 1,
      certification_progress: i,
      certifications: this.props.certifications,
      user: this.props.user,
      certification: {
        fiscal_start: '',
        fiscal_end: '',
        status: 0
      },
      errors: {}
    }
  },
  onNext() {
    this.setState({certification_progress: this.state.certification_progress + 1 })
    console.log('status updated')
  },
  onBack() {
    this.setState({certification_progress: this.state.certification_progress - 1 })
    console.log('status updated')
  },
  onSubmit() {
    console.log('submitted')
  },
  greeting() {
    if (this.state.application_progress == 1) {
      var greeting =
      <div className="greeting">
        <h4>Hello, {this.state.user.institution_name}!</h4>
        <h6 className="progress" data-state={this.state.application_progress} className={STATUS[this.state.certification_progress]}><span>1. Contact</span><span>2. Fiscal Details</span><span>3. Statement of Intent</span><span>4. Review</span></h6>
      </div>
    } else {
      var greeting = <div className="greeting"><h4>Dashboard: {this.state.user.institution_name}</h4></div>
    }
    return greeting
  },
  contact() {
    return <UserContact user={this.state.user} onNext={this.onNext}/>
  },
  fiscalDates() {
    return <FiscalDates user={this.state.user} onNext={this.onNext}/>
  },
  statement() {
    return <UserStatement user={this.state.user} onNext={this.onNext}/>
  },
  certification() {
    return <Certifications user={this.state.user} certifications={this.state.certifications} />
  },
  review() {
    return <CertificationShow user={this.state.user} certification={this.state.certifications[0]} onSubmit={this.onSubmit}/>
  },
  dashboard() {
    if (this.state.certification_progress == 0) {
      var dashboard = this.contact()
    } else if (this.state.certification_progress == 1) {
      var dashboard = this.fiscalDates()
    } else if (this.state.certification_progress == 2) {
      var dashboard = this.statement()
    } else if (this.state.certification_progress == 3) {
      var dashboard = this.review()
    }
    return dashboard
  },
  render() {
    return (
      <div className="dashboard">
          {this.greeting()}
          {this.dashboard()}
          <div className="actions">
            <button className="btn" onClick={this.onNext()}>Next</button>
            <button className="btn" onClick={this.onBack()}>Back</button>
          </div>
      </div>
    );
  }
});
