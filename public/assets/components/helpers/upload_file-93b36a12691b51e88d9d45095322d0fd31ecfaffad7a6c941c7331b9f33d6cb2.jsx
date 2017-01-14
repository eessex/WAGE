var UploadFile = React.createClass({
  componentDidMount() {
    this.addFile()
  },
  handleFileUpdate(model) {
    this.props.handleFileUpdate(model)
  },
  clearFile(e) {
    e.preventDefault()
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
        var progressBar = $('.' + this.props.type + '.bar')
        var fileInput = $('#' + this.props.type + ' input')
        var signature = res.data
        fileInput.fileupload({
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
              css('display', 'flex').
              css('width', '1%').
              text("Loading...");
          },
          done: function(e, data) {
            progressBar.text("Upload complete");
            var key   = $(data.jqXHR.responseXML).find("Key").text();
            var url = $(data.jqXHR.responseXML).find("Location").text()
            var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url })
            var newModel = this.props.model
            newModel[e.target.id] = url.split(/%2F/).join('/')
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
    if ( this.props.accept.includes('ms-excel') ) {
      accepted.push('.xls')
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
  hasLabel() {
    var label
    var subtitle
    if (this.props.label && this.props.label.length) {
      if (this.props.subtitle) {
        subtitle = <p>{this.props.subtitle}</p>
      }
      if (this.props.label == 'true') {
        label = <label className="direct-upload__label"><h4>{this.props.type}</h4>{subtitle}</label>
      } else {
        label = <label className="direct-upload__label"><h4>{this.props.label}</h4>{subtitle}</label>
      }
    }
    return label
  },
  formatFile() {
    var filename = this.props.model[this.props.type]
    if (filename.length > 0) {
      filename = filename.split(/\//).pop()
    }
    return filename
  },
  hasFile() {
    var type = this.props.type
    var accepted = this.getAcceptedFileTypes()
    var file
    if (this.props.model[type]) {
      file = <p id={type} className="direct-upload__has-file form-control">
              <button id={type} onClick={this.clearFile}>Replace</button>
              <a className="filename" href={this.props.model[this.props.type]} target="_blank">{this.formatFile()}</a>
              {this.isRequired()}
            </p>
    } else {
      file = <div className="direct-upload__input">
        <input
          value=""
          type="file"
          className="form-control"
          id={type}
          disabled={this.props.disabled}
          accept={this.props.accept}
          />
        <div className='progress'><div className={type + ' bar'}><div className='bar'>{accepted}</div></div></div>
        {this.isRequired()}
        </div>
    }
    return file
  },
  render() {
    var type = this.props.type
    return (
      <div id={type} className="form direct-upload">
        {this.hasLabel()}
        {this.hasFile()}
      </div>
    )
  }
});
