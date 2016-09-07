var CertificationFinancials = React.createClass({
  getInitialState() {
    var status = this.setFinancialStatus(this.props.certification)
    var progress = this.setProgress(status)
    return {
      certification: this.props.certification,
      editMode: false,
      financial_status: status,
      progress: progress,
      errors: {}
    }
  },
  setEditMode() {
    this.setState({editMode: true});
  },
  setFinancialStatus(certification) {
    financial_status = 0
    if (certification.operating_expenses) {
      financial_status += 1
    } if (certification.ant_artist_expenses) {
      financial_status += 1
    } if (certification.file_budget) {
      financial_status += 1
    } if (certification.file_990) {
      financial_status += 1
    }
    return financial_status
  },
  setProgress(status) {
    if (status == 0) {
      var progress = "empty"
    } else if (status == 4 ) {
      var progress = "complete"
    } else {
      var progress = "pending"
    }
    return progress
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    var financial_status = this.setFinancialStatus(newCertification)
    this.setState({certification: newCertification, financial_status: financial_status });
  },
  handleFileBudgetChange(e) {
    var newCertification = this.state.certification
    newCertification.file_budget = e.target.value
    var financial_status = this.setFinancialStatus(newCertification)
    this.setState({certification: newCertification, financial_status: financial_status });
  },
  handleAntArtistExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.ant_artist_expenses = e.target.value
    var financial_status = this.setFinancialStatus(newCertification)
    this.setState({certification: newCertification, financial_status: financial_status });
  },
  handleFile990Change(e) {
    var newCertification = this.state.certification
    newCertification.file_990 = e.target.value
    var financial_status = this.setFinancialStatus(newCertification)
    this.setState({certification: newCertification, financial_status: financial_status });
  },
  handleCertificationUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications/' + that.state.certification.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          certification: res,
          progress: that.setProgress(that.state.financial_status),
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  render() {
    if ( !this.state.editMode ) {
    var formatted_operating_expenses = '$' + Number(this.props.certification.operating_expenses).toLocaleString();
    var formatted_ant_artist_expenses = '$' + Number(this.props.certification.ant_artist_expenses).toLocaleString();

    certification = (
        <div id="financials" className="view view collapse">
        <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
          <div className="actions">
            <button onClick={this.setEditMode} className="btn btn-lg">Edit</button>
          </div>
          <div className="col-lg-4">
            <h4>Operating Expenses<span>: {formatted_operating_expenses}</span></h4>
            <h4>File 990<span>: {this.props.certification.file_990}</span></h4>
          </div>
          <div className="col-lg-4">
            <h4>Budgeted Artist Fees<span>: {formatted_ant_artist_expenses}</span></h4>
            <h4>Operating Budget<span>: {this.props.certification.file_budget}</span></h4>
          </div>
        </div>
       )
    } else {
      certification = (
      <div id="financials" className="view form financials view collapse in">
        <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
        <div className="actions">
          <button onClick={this.handleCertificationUpdate} className="btn btn-lg">Save</button>
        </div>
        <div className="col-lg-4">
          <div className="field-group">
          <h4>Operating Expenses: </h4>
            <input
              value={this.state.certification.operating_expenses}
              type="text"
              className="form-control"
              onChange={this.handleOperatingExpensesChange} />
            <span style={{color: 'red'}}>{this.state.errors.operating_expenses}</span>
          </div>
          <div className="field-group">
            <h4>File 990: </h4>
              <input
                value={this.state.certification.file_990}
                type="file"
                className="form-control"
                onChange={this.handleFile990Change} />
              <span style={{color: 'red'}}>{this.state.errors.file_990}</span>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="field-group">
            <h4>Budgeted Artist Fees: </h4>
              <input
                value={this.state.certification.ant_artist_expenses}
                type="text"
                className="form-control"
                onChange={this.handleAntArtistExpensesChange} />
              <span style={{color: 'red'}}>{this.state.errors.ant_artist_expenses}</span>
            </div>
            <div className="field-group">
              <h4>Operating Budget: </h4>
                <input
                  value={this.state.certification.file_budget}
                  type="file"
                  className="form-control"
                  onChange={this.handleFileBudgetChange} />
                <span style={{color: 'red'}}>{this.state.errors.file_budget}</span>
              </div>
            </div>
          </div>
      )
    }
    return (
      <div className="financials">
        <div className="intro" data-toggle="collapse" data-target="#financials" href="#financials">
          <h2><span>Financial Details</span></h2>
          <h5 className="status">{this.state.financial_status}/4 <i className={this.state.progress + " fa fa-circle"} aria-hidden="true"></i></h5>
        </div>
        {certification}
      </div>
    );
  }
});
