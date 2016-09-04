
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
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="date"
              value={this.state.certification.fiscal_start}
              onChange={this.handleFiscalStartChange} />
            <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
          </td>
          <td>
            <input
              type="date"
              value={this.state.certification.fiscal_end}
              onChange={this.handleFiscalEndChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
          </td>
          <td>
          </td>
          <td>
            <button onClick={this.handleCertificationUpdate}>Save</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.certification.fiscal_start}</td>
          <td>{this.state.certification.fiscal_end}</td>
          <td>{this.state.certification.status}</td>
          <td>
            <button onClick={this.setEditMode}>Edit</button>
            <button onClick={this.handleCertificationDelete}  style={{color: 'red'}}>Delete</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
});
