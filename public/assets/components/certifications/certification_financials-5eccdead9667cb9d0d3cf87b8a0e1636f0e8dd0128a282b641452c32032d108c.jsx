var CertificationFinancials = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      certifications: this.props.certifications,
      signature: null,
      isFuture: true,
      isPast: false,
      isProgress: false,
      newUser: false,
      errors: {}
    }
  },
  componentDidMount() {
    this.findRequired()
    if (this.props.getYearStatus().future != null) {
      this.setState({isFuture: this.props.getYearStatus().future})
    }
    if (this.props.getYearStatus().past != null) {
      this.setState({isPast: this.props.getYearStatus().past})
    }
    if (this.props.getYearStatus().progress != null) {
      this.setState({isProgress: this.props.getYearStatus().progress})
    }
    if (this.props.getYearStatus().newUser != null) {
      this.setState({newUser: this.props.getYearStatus().newUser})
    }
  },
  hasOperatingExpenses() {
    if (this.props.certification) {
      return this.props.certification.operating_expenses
    } else {
      return ""
    }
  },
  clearFile(e) {
    if (this.state.certification[e.target.id] != undefined) {
      var newCertification = this.state.certification
      newCertification[e.target.id] = ""
      this.setState({certification: newCertification })
      this.props.handleCertificationUpdate(this.state.certification)
    } else {
      var newUser = this.state.user
      newUser[e.target.id] = ""
      this.setState({user: newUser })
      this.props.handleUserUpdate(this.state.user)
    }
    this.fulfilsRequired(e)
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    this.setState({certification: newCertification})
    this.props.handleCertificationUpdate(this.state.certification)
    this.fulfilsRequired(e)
  },
  getSignature(theUpload, cb) {
    $.when( ajaxSign() ).done(function(res){
      cb(theUpload, res.data);
    }.bind(this));
    function ajaxSign() {
      return $.ajax({
        url: '/upload.json',
        dataType: 'json'
      })
    }
  },
  uploadFile(theUpload, signature) {
    var that = this
    var fileInput = $(theUpload.target)
    var progressBar  = $('#' + theUpload.target.id + ' .bar');
    fileInput.fileupload({
      fileInput:       fileInput,
      url:             signature['url'],
      type:            'POST',
      autoUpload:       true,
      formData:         signature['form-data'],
      paramName:        'file',
      dataType:         'XML',
      replaceFileInput: false,
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        progressBar.css('width', progress + '%')
      },
      start: function (e) {
        progressBar.
          css('background', 'lime').
          css('display', 'block').
          css('width', '1%').
          text("Loading...");
      },
      done: function(e, data) {
        progressBar.text("Upload complete");
        var key   = $(data.jqXHR.responseXML).find("Key").text();
        var url = $(data.jqXHR.responseXML).find("Location").text()
        var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url })
        if (e.target.id != "file_501c3") {
          var newCertification = that.state.certification
          newCertification[e.target.id] = url
          that.setState({certification: newCertification});
          that.props.handleCertificationUpdate(this.state.certification)
        } else {
          var newUser = that.state.user
          newUser[e.target.id] = url
          that.setState({user: newUser});
          that.props.handleUserUpdate(this.state.user)
        }
        this.fulfilsRequired(e)
        that.props.canSubmit()
      }.bind(this),
      fail: function(e, data) {
        console.log('fail')
        progressBar.
          css("background", "red").
          text("Failed");
      }
    });
  },
  handleFileChange(e) {
    target = $(e.target)
    this.getSignature(e, this.uploadFile)
  },
  hasFile(type, required="false") {
    var req
    if (required == "true") {
      if ( (this.state.certification[type] && this.state.certification[type] != "") || (this.state.user[type] && this.state.user[type] != "" )) {
        req = <span className="req green">*</span>
      } else {
        req = <span className="req">*</span>
      }
    }
    if (type != "file_501c3" && this.state.certification[type] != "") {
      var file = <div><p className="form-control"><button id={type} onClick={this.clearFile}>Replace</button> {this.state.certification[type]}</p>{req}</div>
    } else if (type == "file_501c3" && this.state.user[type] != "") {
        var file = <div><p className="form-control"><button id={type} onClick={this.clearFile}>Replace</button> {this.state.user[type]}</p>{req}</div>
    } else {
      var file = <div><div className="directUpload">
        <input
          value=""
          type="file"
          className="form-control"
          id={type}
          accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel"
          onChange={this.handleFileChange} />
        <div id={type} className='progress'><div className='bar'>.pdf, .xls, .doc, .docx</div></div>
        </div>{req}</div>
    }
    return file
  },
  hasFile_501c3() {
    var _501c3
    debugger
    if (this.props.getYearStatus().newUser == true) {
      _501c3 = <UploadFile
                model={this.props.user}
                required='true'
                type='file_501c3'
                handleFileUpdate={this.props.handleUserUpdate}
                accept='application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel'
                label="501c3"
                subtitle="Your 501c3 letter of determination or, if you are fiscally sponsored, documentation of sponsorship."
              />
    }
    return _501c3
  },
  hasFile_990() {
    var file_990
    var file_990_caption
    if (this.state.newUser) {
      file_990_caption = "* Most recent if available"
    } else {
      file_990_caption = "* if available"
    }
    if (this.state.newUser || !this.state.isFuture ) {
        file_990 =
          <UploadFile
            model={this.props.certification}
            type='file_990'
            handleFileUpdate={this.props.handleCertificationUpdate}
            accept='application/pdf'
            label="Form 990"
            subtitle={file_990_caption}
          />
      }
    return file_990
  },
  hasFileContract() {
    var file_contract
    if (this.state.newUser) {
      file_contract = <UploadFile
              model={this.props.certification}
              required='true'
              type='file_contract'
              handleFileUpdate={this.props.handleCertificationUpdate}
              accept='application/pdf'
              label="Sample Contracts"
              subtitle="A PDF of templates for any contracts used with artists."
            />
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
    if ( this.state.isFuture ) {
      var operating_caption = "Anticipated total"
    } else {
      var operating_caption = "Total"
    }
    var file_budget_caption = 'A closed out budget for fiscal year ' + moment(this.state.certification.fiscal_end).format('Y') + ' with ‘Artist Fees’ as a distinct line item.'
    return (
      <form id="financials" className="form col-xs-12">
      
            <div className="form-item required add-on">
                <h4 className="col">Operating Expenses</h4>
                <p>{operating_caption} annual expenses for fiscal year {moment(this.state.certification.fiscal_end).format('Y')}.</p>
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
              accept='application/pdf,application/msword,
      application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel'
              label="Operating Budget"
              subtitle={file_budget_caption}
            />

            {this.hasFile_990()}
            {this.hasFile_501c3()}
            {this.hasFileContract()}
          </form>
    );
  }
});
