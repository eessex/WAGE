var Certification = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      editMode: false,
      errors: {}
    }
  },

  // setEditMode() {
  //   this.setState({editMode: true});
  // },
  //
  // handleNameChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.name = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleEmailChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.email = e.target.value
  //   this.setState({certification: newCertification});
  // },
  //
  // handleManagerChange(e) {
  //   var newCertification = this.state.certification
  //   newCertification.manager = e.target.value
  //   this.setState({certification: newCertification});
  // },

  // toggleManagerStatus: function () {
  //   var newCertification = this.state.certification
  //   newCertification.manager = !this.state.certification.manager
  //   this.handleCertificationUpdate();
  // },

  // handleCertificationUpdate() {
  //   var that = this;
  //   $.ajax({
  //     method: 'PUT',
  //     data: {
  //       certification: that.state.certification,
  //     },
  //     url: '/certifications/' + that.state.certification.id + '.json',
  //     success: function(res) {
  //       that.setState({
  //         errors: {},
  //         certification: res,
  //         editMode: false
  //       });
  //     },
  //     error: function(res) {
  //       that.setState({errors: res.responseJSON.errors});
  //     }
  //   });
  // },
  //
  // handleCertificationFire() {
  //   var that = this;
  //   $.ajax({
  //     method: 'DELETE',
  //     url: '/certifications/' + that.state.certification.id + '.json',
  //     success: function(res) {
  //       that.props.onFireCertification(that.state.certification);
  //     }
  //   })
  // },

  render() {
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="date"
              value={this.state.certification.fiscal_start}
              />
            <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
          </td>
          <td>
            <input
              type="date"
              value={this.state.certification.fiscal_end}
               />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
          </td>
          <td>
            <input
              type="checkbox"
              value={this.state.certification.status}
               />
          </td>
          <td>
            <button>Save</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.certification.fiscal_start}</td>
          <td>{this.state.certification.fiscal_end}</td>
          <td>{this.state.certification.status ? '✔' : ''}</td>
          <td>
            <button>Edit</button>
            <button>{this.state.certification.status ? 'Demote' : 'Promote'}</button>
            <button style={{color: 'red'}}>Fire</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
});
