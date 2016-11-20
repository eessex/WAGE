var UserStatement = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      errors: {}
    }
  },
  handleUserUpdate(user) {
    this.props.handleUserUpdate(newUser)
  },
  formStatement() {
    var statement = <StatementFile user={this.props.user} handleUserUpdate={this.handleUserUpdate} />
    return statement
  },
  render() {
    return (
    <div className="statement">
      {this.formStatement()}
    </div>
    )
  }
});

var StatementFile = React.createClass({
  getInitialState() {
    return {
      user: this.props.user
    }
  },
  clearFile(e) {
    var newUser = this.state.user
    newUser[e.target.id] = null
    debugger
    this.setState({user: newUser })
    this.props.handleUserUpdate(newUser)
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
        var newUser = that.state.user
        newUser[e.target.id] = url
        that.setState({user: newUser});
        that.props.handleUserUpdate(this.state.user)
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
    if (this.state.user[type]) {
      var file = <p id={type} className="file-uploaded form-control"><button id={type} onClick={this.clearFile}>Replace</button> {this.state.user[type]}</p>
    } else {
      var file = <div id={type} className="directUpload form-control">
        <input
          value=""
          type="file"
          id={type}
          accept="image/*,application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={this.handleFileChange} />
        <div className='progress'><div className='bar'></div></div>
        </div>
    }
    return file
  },
  render() {
    return (
      <div>
        <h4>Upload a letter on {this.state.user.institution_name}'s letterhead detailing your interest in W.A.G.E. Certification.</h4>
        <h4>Please tell us how getting certified relates to your organization’s mission and why you have chosen to pursue it.</h4>
        {this.hasFile('statement')}
      </div>
    )
  }
});
