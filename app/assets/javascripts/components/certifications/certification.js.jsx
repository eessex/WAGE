
var Certification = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      submitMode: this.setSubmitMode(),
      errors: {},
    }
  },
  setSubmitMode() {
    if (this.props.certification.status == 1) {
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
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_end).format('Y') ) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('Y')
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('Y') + " - " + moment(this.state.certification.fiscal_end).format('Y');
    };
    return formatted_date
  },
  render() {
    var url = "certifications/" + this.state.certification.id
    if (this.state.certification.status == 0 ) {
      var formatted_status = <span className="in-progress">In Progress</span>
    } else if (this.state.certification.status == 1 ) {
      var formatted_status = <span className="submit">Ready To Submit</span>
    } else if (this.state.certification.status == 2 ) {
      var formatted_status = <div className="status-img"><img src="https://s3.amazonaws.com/wagency/WAGE-Pending-Logo.png"/></div>
    } else {
      var formatted_status = <span className="submit">Certified</span>
    }

    if ( this.state.submitMode ) {
      var submit = ( <div>
          <button onClick={this.handleCertificationUpdate} className="btn">Submit</button>
        </div>
      );
    };

    var row = (
        <a href={url} key={this.state.certification.id} className="certification teaser col-xs-1 col-sm-6 col-md-4">
          <h1>{this.formatFiscalDates()}</h1>
          {formatted_status}
          {submit}
        </a>
      );
    return row;
  }
});

          // <h5 className="status">{formatted_status}</h5>
