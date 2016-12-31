var FiscalDetails = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      certifications: this.props.certifications,
      signature: null,
      yearStatus: this.props.yearStatus,
      isProgress: false,
      errors: {}
    }
  },
  componentDidMount() {
    this.findRequired()
  },
  hasOperatingExpenses() {
    if (this.state.certification) {
      return this.state.certification.operating_expenses
    } else {
      return ""
    }
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    this.setState({certification: newCertification})
    this.props.handleCertificationUpdate(this.state.certification)
    this.fulfilsRequired(e)
  },
  hasFile_501c3() {
    var _501c3
    if (this.props.newUser == true) {
      _501c3 = <UploadFile
                model={this.props.user}
                required='true'
                type='file_501c3'
                handleFileUpdate={this.props.handleUserUpdate}
                accept='application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel'
                label='501c3'
                subtitle='Your 501c3 letter of determination or, if you are fiscally sponsored, documentation of sponsorship.' />
    }
    return _501c3
  },
  hasFile_990() {
    var file_990
    var file_990_caption
    if (this.props.newUser == true) {
      file_990_caption = "* Most recent if available"
    } else {
      file_990_caption = "* if available"
    }
    if (this.state.newUser || this.props.yearStatus != 'future' ) {
        file_990 =
          <UploadFile
            model={this.props.certification}
            type='file_990'
            handleFileUpdate={this.props.handleCertificationUpdate}
            accept='application/pdf'
            label="Form 990"
            subtitle={file_990_caption} />
      }
    return file_990
  },
  hasFileContract() {
    var file_contract
    if (this.props.newUser == true) {
      file_contract = <UploadFile
              model={this.props.certification}
              required='true'
              type='file_contract'
              handleFileUpdate={this.props.handleCertificationUpdate}
              accept='application/pdf'
              label="Sample Contracts"
              subtitle="A PDF of templates for any contracts used with artists." />
    }
    return file_contract
  },
  fulfilsRequired(e) {
    if (e.target) {
      e = e.target
    }
    if ($(e).find('input').attr('id') == 'operating_expenses' && $(e).find('input').val().length > 3) {
      $(e).find('.req').addClass('green')
    } else if ($(e).find('input').val() != "" && $(e).find('p.form-control') ) {
      $(e).find('.req').addClass('green')
    } else {
      $(e).find('.req').removeClass('green')
    }
  },
  findRequired() {
    var required = $('.form-item.required')
    var that = this
    required.each( function(i, input) {
      that.fulfilsRequired(input)
    })
  },
  render() {
    var file_990_caption
    if ( this.props.yearStatus == 'future' ) {
      var operating_caption = "Anticipated total"
    } else {
      var operating_caption = "Total"
    }
    var file_budget_caption = 'A closed out budget for fiscal year ' + moment(this.props.certification.fiscal_end).format('Y') + ' with ‘Artist Fees’ as a distinct line item.'
    return (
      <form id="fiscal-details" className="form col-xs-12">
            <div className="form-item required add-on">
                <h4 className="col">Operating Expenses</h4>
                <p>{operating_caption} annual expenses for fiscal year {moment(this.props.certification.fiscal_end).format('Y')}.</p>
                  <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input
                    value={this.hasOperatingExpenses()}
                    type="text"
                    id="operating_expenses"
                    className="form-control"
                    onChange={this.handleOperatingExpensesChange} />
                  <span className="req">*</span>
                  <div className="input-group-addon">.00</div>
                </div>
              <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.operating_expenses}</span>
              </div>
            </div>

            <UploadFile
              model={this.props.certification}
              required='true'
              type='file_budget'
              handleFileUpdate={this.props.handleCertificationUpdate}
              accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel'
              label='Operating Budget'
              subtitle={file_budget_caption} />

            {this.hasFile_990()}
            {this.hasFile_501c3()}
            {this.hasFileContract()}
          </form>
    );
  }
});
