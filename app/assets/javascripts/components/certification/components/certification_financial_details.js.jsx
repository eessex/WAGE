var FinancialDetails = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      certifications: this.props.certifications,
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
  hasFile_990() {
    var file_990
    var file_990_caption
    file_990_caption = "* if available"
    if (!this.props.new_user && this.props.yearStatus == 'past' ) {
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
      var operating_caption = "anticipated total"
    } else {
      var operating_caption = "total"
    }
    var file_budget_caption = 'Upload a closed out budget for fiscal year ' + moment(this.props.certification.fiscal_end).format('Y') + ' with ‘Artist Fees’ as a distinct line item.'
    return (
      <form className="financials financials--fiscal-details form">
            <div className="form-item required add-on">
                <h4 className="col">Operating Expenses</h4>
                <p>Enter your {operating_caption} annual expenses to generate a custom fee schedule.</p>
                <a href="/#fee-schedule"><button className="btn fee-schedule" >My Fee Schedule</button></a>
                  <div className="input-group input-group__addon">
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
                <span className='error'>{this.state.errors.operating_expenses}</span>
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
          </form>
    );
  }
});
