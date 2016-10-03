var CertificationFinancials = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
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
      var file_budget = <p className="form-control"><button>Replace</button> {this.state.certification.file_budget}</p>
    } else {
      var file_budget = <input
        value={this.state.certification.file_budget}
        type="file"
        className="form-control"
        onChange={this.handleFileBudgetChange} />
    }
    return file_budget
  },
  clearFile990() {
    var newCertification = this.state.certification
    newCertification.file_990 = null
    this.setState({certification: newCertification });
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
  },
  handleAntArtistExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.ant_artist_expenses = e.target.value
    this.setState({certification: newCertification });
  },
  handleFile990Change(e) {
    var newCertification = this.state.certification
    newCertification.file_990 = e.target.value
    this.setState({certification: newCertification });
  },
  handleCertificationUpdate() {
    var that = this;
    $('.btn.save').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>').addClass('loading')
    $.ajax({
      method: 'PUT',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications/' + that.state.certification.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          certification: res
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
    setTimeout(function(){
      $('.btn.save').html('Save').removeClass('loading')
    }, 2000);
  },
  render() {
    return (
      <div id="financials" className="form">
          <div>
            <div className="field-group">
            <h4 className="col-md-6">Operating Expenses</h4>
              <input
                value={this.state.certification.operating_expenses}
                type="text"
                className="form-control"
                onChange={this.handleOperatingExpensesChange} />
              <span style={{color: 'red'}}>{this.state.errors.operating_expenses}</span>
            </div>
            <div className="field-group">
              <h4 className="col col-md-6">File 990 (most recent)</h4>
                {this.hasFile990()}
                <span style={{color: 'red'}}>{this.state.errors.file_990}</span>
              </div>
            </div>
              <div className="field-group">
                <h4 className="col col-md-6">Operating Budget</h4>
                  {this.hasFileBudget()}
                  <span style={{color: 'red'}}>{this.state.errors.file_budget}</span>
                </div>
              <div id="actions">
                <button onClick={this.handleCertificationUpdate} className="btn btn-lg save">Save</button>
              </div>
            </div>
    );
  }
});
