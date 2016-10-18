var CertificationFinancials = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      certifications: this.props.certifications,
      isFuture: this.props.isFuture,
      errors: {}
    }
  },
  hasFile990() {
    if (this.state.certification.file_990) {
      var file_990 = <p className="form-control"><button onClick={this.clearFile990}>Replace</button> {this.state.certification.file_990}</p>
    } else {
      var file_990 = <input
        value={this.state.certification.file_990}
        type="file"
        className="form-control"
        onChange={this.handleFile990Change} />
    }
    return file_990
  },
  hasFileBudget() {
    if (this.state.certification.file_budget) {
      var file_budget = <p className="form-control"><button onClick={this.clearFileBudget}>Replace</button> {this.state.certification.file_budget}</p>
    } else {
      var file_budget = <input
        value={this.state.certification.file_budget}
        type="file"
        className="form-control"
        onChange={this.handleFileBudgetChange} />
    }
    return file_budget
  },
  hasFileContract() {
    if (this.state.certification.file_contract) {
      var file_contract = <p className="form-control"><button onClick={this.clearFileContract}>Replace</button> {this.state.certification.file_contract}</p>
    } else {
      var file_contract = <input
        value={this.state.certification.file_contract}
        type="file"
        className="form-control"
        onChange={this.handleFileContractChange} />
    }
    return file_contract
  },
  hasFile_501c3() {
    if (this.props.newUser == true && this.state.user.file_501c3) {
        var _501c3 =  <div className="form-item">
                      <h4>501c3</h4>
                      <p>Your 501c3 letter of determination or, if you are fiscally sponsored, documentation of sponsorship.</p>
                      <p className="form-control"><button onClick={this.clearFile_501c3}>Replace</button> {this.state.user.file_501c3}</p>
                      <span style={{color: 'red'}}>{this.state.errors.file_501c3}</span>
                    </div>
      } else {
        var _501c3 = <div className="form-item">
                      <h4>501c3</h4>
                      <p>Your 501c3 letter of determination or, if you are fiscally sponsored, documentation of sponsorship.</p>
                      <input
                      value={this.state.user.file_501c3}
                      type="file"
                      className="form-control"
                      onChange={this.handleFile_501c3Change} />
                      <span style={{color: 'red'}}>{this.state.errors.file_501c3}</span>
                    </div>
      }
    return _501c3
  },
  hasOperatingExpenses() {
    if (this.props.certification) {
      return this.props.certification.operating_expenses
    } else {
      return ""
    }
  },
  clearFile990() {
    var newCertification = this.state.certification
    newCertification.file_990 = null
    this.setState({certification: newCertification });
  },
  clearFileBudget() {
    var newCertification = this.state.certification
    newCertification.file_budget = null
    this.setState({certification: newCertification });
  },
  clearFileContract() {
    var newCertification = this.state.certification
    newCertification.file_contract = null
    this.setState({certification: newCertification });
  },
  clearFile_501c3() {
    var newUser = this.state.user
    newUser.file_501c3 = null
    this.setState({user: newUser });
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    this.setState({certification: newCertification});
    this.props.handleCertificationUpdate(this.state.certification)
  },
  handleFileBudgetChange(e) {
    var newCertification = this.state.certification
    newCertification.file_budget = e.target.value
    this.setState({certification: newCertification});
    this.props.handleCertificationUpdate(this.state.certification)
  },
  handleFileContractChange(e) {
    var newCertification = this.state.certification
    newCertification.file_contract = e.target.value
    this.setState({certification: newCertification});
    this.props.handleCertificationUpdate(this.state.certification)
  },
  handleFile990Change(e) {
    var newCertification = this.state.certification
    newCertification.file_990 = e.target.value
    this.setState({certification: newCertification });
    this.props.handleCertificationUpdate(this.state.certification)
  },
  handleFile_501c3Change(e) {
    var newUser = this.state.user
    newUser.file_501c3 = e.target.value
    this.setState({user: newUser });
    this.props.handleUserUpdate(this.state.user)
  },
  render() {
    var file_990_caption

    if ( this.state.certification.isFuture) {
      var operating_caption = "Anticipated total"
      if (this.state.newUser) {
        var file_990_caption = <small> * Most recent</small>
      }
    } else {
      var operating_caption = "Total"
    }
    return (
      <div id="financials" className="form col-xs-12">
            <div className="form-item">
                <h4 className="col">Operating Expenses</h4>
                <p>{operating_caption} annual expenses for fiscal year {moment(this.state.certification.fiscal_start).format('Y')}.</p>
                  <input
                    value={this.hasOperatingExpenses()}
                    type="text"
                    className="form-control"
                    onChange={this.handleOperatingExpensesChange} />
                <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.operating_expenses}</span>
                </div>
            </div>
            <div className="form-item">
                <h4>Form 990{file_990_caption}</h4>
                {this.hasFile990()}
              <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.file_990}</span>
              </div>
            </div>
            <div className="form-item">
                <h4>Sample Contracts</h4>
                <p>A PDF of templates for any contracts used with artists.</p>
                {this.hasFileContract()}
              <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.file_990}</span>
              </div>
            </div>
            <div className="form-item">
              <h4>Operating Budget</h4>
              <p>A closed out operating budget for the fiscal year  {moment(this.state.certification.fiscal_start).format('Y')} with ‘Artist Fees’ visible as a distinct line item.</p>
              {this.hasFileBudget()}
              <span style={{color: 'red'}}>{this.state.errors.file_budget}</span>
            </div>
            {this.hasFile_501c3()}
          </div>
    );
  }
});
