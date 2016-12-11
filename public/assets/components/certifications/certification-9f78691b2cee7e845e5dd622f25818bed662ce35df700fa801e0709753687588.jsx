
var Certification = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      submitMode: this.setSubmitMode(),
      errors: {},
    }
  },
  setSubmitMode() {
    if (this.props.certification.status == 2) {
      return true
    } else {
      return false
    }
  },
  handleFiscalStartChange(e) {
    var newCertification = this.state.certification
    newCertification.fiscal_start = e.target.value
    this.setState({certification: newCertification});
  },

  handleFiscalEndChange(e) {
    var newCertification = this.state.certification
    newCertification.fiscal_end = e.target.value
    this.setState({certification: newCertification});
  },

  handleStatusChange(e) {
    var newCertification = this.state.certification
    newCertification.status = e.target.value
    this.setState({certification: newCertification});
  },

  toggleStatus: function () {
    var newCertification = this.state.certification
    newCertification.status = this.state.certification.status + 1
    this.handleCertificationUpdate(newCertification);
  },

  handleCertificationUpdate(certification) {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: certification,
      },
      url: '/certifications/' + certification.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          certification: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleCertificationDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/certifications/' + that.state.certification.id + '.json',
      success: function(res) {
        that.props.onDeleteCertification(that.state.certification);
      }
    })
  },
  formatFiscalDates() {
    var formatted_date = moment(this.state.certification.fiscal_end).format('Y')
    return formatted_date
  },
  render() {
    var url = "certifications/" + this.state.certification.id
    if (this.state.certification.status == 0 ) {
      var formatted_status = "In Progress"
    } else if (this.state.certification.status == 1 ) {
      var formatted_status = "In Review"
    } else if (this.state.certification.status == 2 ) {
      var formatted_status = "W.A.G.E. Certified Pending"
    } else if (this.state.certification.status == 3 ) {
      var formatted_status = "Pending Updates"
    } else if (this.state.certification.status == 4 ) {
      var formatted_status = "W.A.G.E. Certified"
    } else {
      var formatted_status = "W.A.G.E. Certified Pending"
    }

    if ( this.state.submitMode ) {
      var submit = ( <div>
          <button onClick={this.handleCertificationUpdate} className="btn">Submit</button>
        </div>
      );
    };

    var row = (
        <a href={url} key={this.state.certification.id} className="certification teaser">
          <h3>{this.formatFiscalDates()}</h3>
          <span className="status"><i className="fa fa-check"></i>{formatted_status}</span>
          <span className="updated">{moment(this.state.certification.updated_at).fromNow()}</span>
          {submit}
        </a>
      );
    return row;
  }
});
