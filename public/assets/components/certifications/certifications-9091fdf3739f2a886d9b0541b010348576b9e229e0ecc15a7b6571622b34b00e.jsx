var Certifications = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      certification: {
        fiscal_start: '',
        fiscal_end: '',
        status: 0
      },
      errors: {}
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
  handleAddCertification() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications.json',
      success: function(res) {
        var newCertificationList = that.state.certifications;
        newCertificationList.push(res);
        that.setState({
          certifications: newCertificationList,
          certification: {
            fiscal_start: '',
            fiscal_end: '',
            status: 0
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleDeleteCertification(certification) {
    var certificationList = this.state.certifications.filter(function(item) {
      return certification.id !== item.id;
    });
    this.setState({certifications: certificationList});
  },

  render() {
    var that = this;
    certifications = this.state.certifications.map( function(certification) {
      return (
        <Certification certification={certification} key={certification.id} onDeleteCertification={that.handleDeleteCertification} />
      );
    });
    return (
      <div className="certifications">
        <div className="title" data-toggle="collapse" data-target="#certifications" href="#certifications">
          <h2><span>Applications</span></h2>
        </div>
        <div id="certifications" className="certifications view collapse">
          <i className="fa collapse fa-caret-right" aria-hidden="true"></i>
          <div className="header">
            <h4>Complete an application for each fiscal year in which your organization wishes to be certified.</h4>
          </div>
      <div>
        <div id="certifications">
          <div className="new">
            <table className="form">
              <thead>
                <tr>
                  <th>Fiscal Start</th>
                  <th>Fiscal End</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                    type="date"
                    value={this.state.certification.name}
                    onChange={this.handleFiscalStartChange}
                    className="form-control" />
                    <span style={{color: 'red'}}>{this.state.errors.fiscal_start}</span>
                  </td>
                  <td>
                    <input
                    value={this.state.certification.fiscal_end}
                    type="date"
                    className="form-control"
                    onChange={this.handleFiscalEndChange} />
                    <span style={{color: 'red'}}>{this.state.errors.fiscal_end}</span>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={this.handleAddCertification}>
                      New
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {certifications}
        </div>
      </div>
        </div>
        </div>
    );
  }
});
