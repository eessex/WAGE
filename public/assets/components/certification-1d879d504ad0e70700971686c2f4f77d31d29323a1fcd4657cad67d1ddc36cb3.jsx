
var Certification = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      editMode: false,
      errors: {}
    }
  },
  setEditMode() {
    this.setState({editMode: true});
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
    newCertification.status = !this.state.certification.status
    this.handleCertificationUpdate();
  },

  handleCertificationUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications/' + that.state.certification.id + '.json',
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

  render() {
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_start).format('Y') ) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    };

    if (this.state.certification.status == 0 ) {
      var formatted_status = <span className="in-progress">In Progress</span>
    } else if (this.state.certification.status == 1 ) {
      var formatted_status = <span className="submit">Ready To Submit</span>
    }

    if ( this.state.editMode ) {
      var markup = (
        <div>
          <div className="field-group">
            <input
              type="date"
              value={this.state.certification.fiscal_start}
              onChange={this.handleFiscalStartChange} />
            <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
          </div>
          <div className="field-group">
            <input
              type="date"
              value={this.state.certification.fiscal_end}
              onChange={this.handleFiscalEndChange} />
            <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
          </div>
          <div className="field-group">
          </div>
          <div className="field-group">
            <button onClick={this.handleCertificationUpdate}>Save</button>
          </div>
        </div>
      );
    } else {
    var markup = (
        <a href={this.state.certification.id} className="certification teaser col-md-6 col-lg-4">
          <h4>{formatted_date}</h4>
          <h5 className="status">{formatted_status}</h5>
        </a>
      );
    }
    return markup;
  }
});
