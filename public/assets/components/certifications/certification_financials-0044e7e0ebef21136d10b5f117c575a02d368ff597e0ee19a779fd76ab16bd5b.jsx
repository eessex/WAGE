var CertificationFinancials = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      certifications: this.props.certifications,
      signature: null,
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
  clearFile(e) {
    var newCertification = this.state.certification
    newCertification[e.target.id] = null
    this.setState({certification: newCertification })
    this.props.handleCertificationUpdate(this.state.certification)
  },
  handleOperatingExpensesChange(e) {
    var newCertification = this.state.certification
    newCertification.operating_expenses = e.target.value
    this.setState({certification: newCertification})
    this.props.handleCertificationUpdate(this.state.certification)
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
        that.canSubmit()
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
  hasFile(type) {
    if (this.state.certification[type]) {
      var file = <p className="form-control"><button id={type} onClick={this.clearFile}>Replace</button> {this.state.certification[type]}</p>
    } else {
      var file = <div className="directUpload">
        <input
          value=""
          type="file"
          className="form-control"
          id={type}
          onChange={this.handleFileChange} />
        <div id={type} className='progress'><div className='bar'></div></div>
        </div>
    }
    return file
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
                      {this.hasFile("file_501c3")}
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
      <form id="financials" className="form col-xs-12">
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
                {this.hasFile("file_990")}
              <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.file_990}</span>
              </div>
            </div>
            <div className="form-item">
                <h4>Sample Contracts</h4>
                <p>A PDF of templates for any contracts used with artists.</p>
                {this.hasFile("file_contract")}
              <div className="helper">
                <span style={{color: 'red'}}>{this.state.errors.file_contract}</span>
              </div>
            </div>
            <div className="form-item">
              <h4>Operating Budget</h4>
              <p>A closed out budget for FY {moment(this.state.certification.fiscal_start).format('Y')} with ‘Artist Fees’ as a distinct line item.</p>
              {this.hasFile("file_budget")}
              <span style={{color: 'red'}}>{this.state.errors.file_budget}</span>
            </div>
            {this.hasFile_501c3()}
          </form>
    );
  }
});
