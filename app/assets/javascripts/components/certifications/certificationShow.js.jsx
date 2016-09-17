var CertificationShow = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.hasPayments(),
      submitMode: this.setSubmitMode(),
      previewMode: this.setPreviewMode(),
      errors: {},
    }
  },
  hasPayments() {
    if (this.props.artist_payments) {
      var artist_payments = this.props.artist_payments
    } else {
      var artist_payments = []
    }
    return artist_payments
  },
  setSubmitMode() {
    if (this.props.certification.status > 0) {
      return true
    } else {
      return false
    }
  },
  setPreviewMode() {
    this.setState({previewMode: false});
  },
  togglePreviewMode() {
    this.setState({previewMode: !this.state.previewMode});
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
    var artist_payments = this.state.artist_payments.map( function(artist_payment, i) {
      var payment_row =
                <tr key={artist_payment.id}>
                   <td className="first">{artist_payment.date}</td>
                   <td>{artist_payment.artist_name}</td>
                   <td>{artist_payment.name}</td>
                   <td>{artist_payment.fee_category_id}</td>
                   <td>{artist_payment.amount}</td>
                   <td>{artist_payment.check_no}</td>
                </tr>

      var index = i + 1
      return (
        <table>
          <thead>
            <tr>
              <th className="first">Date</th>
              <th>Artist Name</th>
              <th>Program Name</th>
              <th>Fee Category</th>
              <th>Amount</th>
              <th>Check No.</th>
            </tr>
          </thead>
          <tbody>
            {payment_row}
          </tbody>
        </table>
      )
    })

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

    if ( this.state.submitMode ) {
      var submit = ( <div>
          <button onClick={this.handleCertificationUpdate} className="btn">Submit</button>
        </div>
      );
    };

    if ( !this.state.previewMode ) {
      var preview = (
        <div className="preview">
          <CertificationSubmitView certification={this.state.certification} user={this.state.user} artist_payments={this.state.artist_payments}/>
        </div>
      );
    } else {
      var edit_mode = (
        <div className="edit">
          <CertificationFinancials certification={this.state.certification} />
          <ArtistPayments artist_payments={this.state.artist_payments} certification={this.state.certification} fee_categories={this.props.fee_categories}/>
        </div>
      )
    };
    if ( !this.state.previewMode ) {
      var editButton = "Edit"
    } else {
      var editButton = "Preview"
    }

    var row = (
        <div key={this.state.certification.id}>
          <div className="title">
          <div className="page-header">
            <h2>Application</h2>
            <div>
              <h5 className="header">For fiscal year</h5>
              <h4>{formatted_date}</h4>
            </div>
          </div>
          <div className="status">
            <h4 className="status">{formatted_status} <button onClick={this.togglePreviewMode} className="btn">{editButton}</button></h4>
            {submit}
          </div>
          </div>
          <div className="body ">
            {preview}
            {edit_mode}
          </div>
        </div>
      );
    return row;
  }
});
