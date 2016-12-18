var UserStatement = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      errors: {}
    }
  },
  componentDidMount() {
    this.newSignature()
    this.addFile()
  },
  handleUserUpdate(user) {
    this.props.handleUserUpdate(user)
  },
  clearFile(e) {
    var newUser = this.state.user
    newUser[e.target.id] = null
    this.setState({user: newUser })
    this.props.handleUserUpdate(newUser)
  },
  newSignature() {
    $.ajax({
      url: '/upload.json',
      dataType: 'json',
      success: function(res) {
        return res.data
      }.bind(this)
    })
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
  addFile() {
    $.ajax({
      url: '/upload.json',
      dataType: 'json',
      success: function(res) {
        var progressBar  = $('.bar');
        var fileInput = $('input:file')
        var signature = res.data
        $('input:file').fileupload({
          fileInput:       fileInput,
          url:             signature['url'],
          type:            'POST',
          autoUpload:       true,
          formData:         signature['form-data'],
          paramName:        'file',
          dataType:         'XML',
          replaceFileInput: false,
          add: function (e, data) {
            debugger
            data.submit()
          },
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
            debugger
            progressBar.text("Upload complete");
            var key   = $(data.jqXHR.responseXML).find("Key").text();
            var url = $(data.jqXHR.responseXML).find("Location").text()
            var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url })
            debugger
            var newUser = this.state.user
            newUser[e.target.id] = url
            this.setState({user: newUser});
            this.handleUserUpdate(this.state.user)
          }.bind(this),
          fail: function(e, data) {
            debugger
            console.log('fail')
            progressBar.
              css("background", "red").
              text("Failed");
          }
        });
      }.bind(this)
    })
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
          accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <span className="req">*</span>
        <div className='progress'><div className='bar'><div className='bar'>.pdf, .doc, .docx</div></div></div>
        </div>
    }
    return file
  },
  render() {
    return (
      <div className="statement">
        <h4>Upload a letter on {this.state.user.institution_name}'s letterhead detailing your interest in W.A.G.E. Certification.</h4>
        <h4>Please tell us how getting certified relates to your organization’s mission and why you have chosen to pursue it.</h4>
        {this.hasFile('statement')}
      </div>
    )
  }
});
