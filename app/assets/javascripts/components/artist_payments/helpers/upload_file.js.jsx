var UploadFile = React.createClass({
  componentDidMount() {
    this.addFile()
  },
  handleFileUpdate(model) {
    this.props.handleFileUpdate(model)
  },
  clearFile(e) {
    var newModel = this.props.model
    newModel[e.target.id] = null
    this.props.handleFileUpdate(newModel)
    this.addFile()
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
            progressBar.text("Upload complete");
            var key   = $(data.jqXHR.responseXML).find("Key").text();
            var url = $(data.jqXHR.responseXML).find("Location").text()
            var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url })
            var newModel = this.props.model
            newModel[e.target.id] = url
            this.props.handleFileUpdate(newModel)
          }.bind(this),
          fail: function(e, data) {
            console.log('fail')
            progressBar.
              css("background", "red").
              text("Failed");
          }
        });
      }.bind(this)
    })
  },
  getAcceptedFileTypes() {
    var accepted = []
    if ( this.props.accept.includes('pdf') ) {
      accepted.push('.pdf')
    }
    if ( this.props.accept.includes('msword') ) {
      accepted.push('.doc')
    }
    if ( this.props.accept.includes('openxmlformats-officedocument') ) {
      accepted.push('.docx')
    }
    return accepted.join(", ")
  },
  isRequired() {
    var required
    if (this.props.required == 'true') {
      if (!this.props.model[this.props.type]) {
      required = <span className="req">*</span>
      } else {
        required = <span className="req green">*</span>
      }
    }
    return required
  },
  hasFile() {
    var type = this.props.type
    var accepted = this.getAcceptedFileTypes()
    var file
    if (this.props.model[type]) {
      file = <p id={type} className="form-control"><button id={type} onClick={this.clearFile}>Replace</button> {this.props.model[type]}</p>
    } else {
      file = <div>
        <input
          value=""
          type="file"
          className="form-control"
          id={type}
          accept={this.props.accept}
          />
        <div className='progress'><div className='bar'><div className='bar'>{accepted}</div></div></div>
        </div>
    }
    return file
  },
  render() {
    var type = this.props.type
    return (
      <div id={type} className="directUpload">
        {this.hasFile()}
        {this.isRequired()}
      </div>
    )
  }
});
