var CertificationFinancials = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      certifications: this.props.certifications,
      canSubmit: this.props.canSubmit,
      errors: {}
    }
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
    this.setState({certification: newCertification })
    this.props.handleCertificationUpdate(this.state.certification)
  },
  clearFileBudget() {
    var newCertification = this.state.certification
    newCertification.file_budget = null
    this.setState({certification: newCertification })
    this.props.handleCertificationUpdate(this.state.certification)
  },
  clearFileContract() {
    var newCertification = this.state.certification
    newCertification.file_contract = null
    this.setState({certification: newCertification })
    this.props.handleCertificationUpdate(this.state.certification)
  },
  clearFile_501c3() {
    var newUser = this.state.user
    newUser.file_501c3 = null
    this.setState({user: newUser })
    this.props.handleUserUpdate(this.state.user)
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    this.setState({certification: newCertification})
    this.props.handleCertificationUpdate(this.state.certification)
  },
  getSignature(e, cb) {
    console.log('getSignature')
      $.getJSON('/upload.json', function (signature) {
          cb(e, signature.data);
      });
  },
  uploadFile(event, signature) {
    console.log('uploadFile')
    var fileInput = $(event.target)
    debugger
    // fileInput: $(this).find('input:file')
    fileInput.fileupload({
      fileInput:        fileInput,
      url:              signature['url'],
      type:             'POST',
      headers:          {'Content-Type': 'multipart/form-data'},
      autoUpload:       true,
      formData:         signature['form-data'],
      paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
      dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
      replaceFileInput: false,
      progressall: function (e, data) {
        console.log('progress')
        debugger
        // var progress = parseInt(data.loaded / data.total * 100, 10);
        // progressBar.css('width', progress + '%')
      },
      add: function (e, data) {
        console.log('add')
        debugger
        data.submit()
        // var progress = parseInt(data.loaded / data.total * 100, 10);
        // progressBar.css('width', progress + '%')
      },
      start: function (e) {
        console.log('start')
        debugger
        // submitButton.prop('disabled', true);

        // progressBar.
        //   css('background', 'green').
        //   css('display', 'block').
        //   css('width', '0%').
        //   text("Loading...");
      },
      done: function(e, data) {
        console.log('done')
        debugger
    //     // // submitButton.prop('disabled', false);
    //     // progressBar.text("Uploading done");
    //     //
    //     // // extract key and generate URL from response
    //     // var key   = $(data.jqXHR.responseXML).find("Key").text();
    //     // var url   = '//' + form.data('host') + '/' + key;
    //
    //     // create hidden field
    //     // var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url })
    //     // form.append(input);
      },
      fail: function(e, data) {
        console.log('fail')
        debugger
        // submitButton.prop('disabled', false);

        // progressBar.
        //   css("background", "red").
        //   text("Failed");
        }
    });
  },
  handleFileBudgetChange(e) {
    console.log('handleFileBudgetChange')
    this.getSignature(e, this.uploadFile)
    var fileInput    = e.target
    console.log('handleFileBudgetChange')
    // var newCertification = this.state.certification
    // newCertification.file_budget = e.target.value
    // this.setState({certification: newCertification});
    // this.props.handleCertificationUpdate(this.state.certification)
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
  hasFile990() {
    if (this.state.certification.file_990) {
      var file_990 = <p className="form-control"><button onClick={this.clearFile990}>Replace</button> {this.state.certification.file_990}</p>
    } else {
      var file_990 = <input
        value={this.state.certification.file_990}
        type="file"
        className="form-control directUpload"
        onChange={this.handleFile990Change} />
    }
    return file_990
  },
  hasFileBudget() {
    // if (this.state.certification.file_budget) {
    //   var file_budget = <p className="form-control"><button onClick={this.clearFileBudget}>Replace</button> {this.state.certification.file_budget}</p>
    // } else {
      var file_budget = <div className="directUpload form-control">
        <input
          value={this.state.certification.file_budget}
          type="file"
          className="form"
          onChange={this.handleFileBudgetChange} />
        <div className='bar'><div className='progress'></div></div>
        </div>
    // }
    return file_budget
  },
  hasFileContract() {
    if (this.state.certification.file_contract) {
      var file_contract = <p className="form-control"><button onClick={this.clearFileContract}>Replace</button> {this.state.certification.file_contract}</p>
    } else {
      var file_contract = <input
        value={this.state.certification.file_contract}
        type="file"
        className="form-control directUpload"
        onChange={this.handleFileContractChange} />
    }
    return file_contract
  },
  hasFile_501c3() {
    if ( (this.props.newUser == true && this.state.user.file_501c3) || this.state.user.file_501c3 ) {
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
                      className="form-control directUpload"
                      onChange={this.handleFile_501c3Change} />
                      <span style={{color: 'red'}}>{this.state.errors.file_501c3}</span>
                    </div>
      }
    return _501c3
  },
  render() {
    var file_990_caption
    if ( this.props.isFuture ) {
      var operating_caption = "Anticipated total"
      if (this.props.newUser) {
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
