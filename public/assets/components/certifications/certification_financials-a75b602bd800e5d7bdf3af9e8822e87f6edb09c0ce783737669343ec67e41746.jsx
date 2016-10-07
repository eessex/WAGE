var CertificationFinancials = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
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
  hasFile_501c3() {
    if (this.state.user.file_501c3) {
      var _501c3 = <p className="form-control"><button onClick={this.clearFile_501c3}>Replace</button> {this.state.user.file_501c3}</p>
    } else {
      var _501c3 = <input
        value={this.state.user.file_501c3}
        type="file"
        className="form-control"
        onChange={this.handleFile_501c3Change} />
    }
    return _501c3
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
  clearFile_501c3() {
    var newUser = this.state.user
    newUser._501c3 = null
    this.setState({user: newUser });
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    this.setState({certification: newCertification});
  },
  handleFileBudgetChange(e) {
    var newCertification = this.state.certification
    newCertification.file_budget = e.target.value
    this.setState({certification: newCertification});
    this.props.handleCertificationUpdate(this.state.certification)
  },
  handleFile990Change(e) {
    var newCertification = this.state.certification
    newCertification.file_990 = e.target.value
    this.setState({certification: newCertification });
  },
  handleFile_501c3Change(e) {
    var newUser = this.state.user
    newUser.file_501c3 = e.target.value
    this.setState({user: newUser });
    this.props.handleUserUpdate(this.state.user)
  },
  handleCertificationUpdate() {
    $('.btn.save').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>').addClass('loading')
    this.props.handleCertificationUpdate(this.state.certification)
    setTimeout(function(){
      $('.btn.save').html('Save').removeClass('loading')
    }, 2000);
  },
  render() {
    return (
      <div id="financials" className="form">
            <div className="form-item">
                <h4 className="col">Operating Expenses</h4>
                <p>Anticipated total annual expenses for the current fiscal year.</p>
                  <input
                    value={this.state.certification.operating_expenses}
                    type="text"
                    className="form-control"
                    onChange={this.handleOperatingExpensesChange} />
                <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.operating_expenses}</span>
                </div>
            </div>
            <div className="form-item">
                <h4>Form 990 <small>* Most recent</small></h4>
                {this.hasFile990()}
              <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.file_990}</span>
              </div>
            </div>
            <div className="form-item">
              <h4>Operating Budget</h4>
              <p>A closed out operating budget for the current year with ‘Artist Fees’ visible as a distinct line item.</p>
              {this.hasFileBudget()}
              <span style={{color: 'red'}}>{this.state.errors.file_budget}</span>
            </div>
            <div className="form-item">
              <h4>501c3</h4>
              <p>Your 501c3 letter of determination or, if you are fiscally sponsored, documentation of sponsorship.</p>
              {this.hasFile_501c3()}
              <span style={{color: 'red'}}>{this.state.errors.file_501c3}</span>
            </div>
            <div id="actions">
              <button onClick={this.handleCertificationUpdate} className="btn btn-lg save">Save</button>
            </div>
          </div>
    );
  }
});
