 var FeeTrackerNew = React.createClass({
  getInitialState() {
    return {
      artist_payment: {
        date: '',
        artist_name: '',
        name: '',
        fee_category_id: 1,
        amount: '',
        check_no: '',
        certification_id: this.props.certification.id,
      },
      showForm: true,
      errors: {}
    }
  },
  handleInputChange(e) {
    var newPayment = this.state.artist_payment
    newPayment[e.target.name] = e.target.value
    this.setState({artist_payment: newPayment})
    this.fulfilsRequired(e)
  },
  fulfilsRequired(e) {
    if (e.target) {
      e = e.target
    }
    if ( $(e).find('input').val() != "")  {
      $(e).next('.req').addClass('green')
    } else {
      $(e).next('.req').removeClass('green')
    }
  },
  addArtistPayment() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        artist_payment: that.state.artist_payment,
      },
      url: '/artist_payments.json',
      success: function(res) {
        that.props.handleAddArtistPayment(res);
        that.setState({
          artist_payment: {
            date: '',
            artist_name: '',
            name: '',
            fee_category_id: 1,
            amount: '',
            check_no: '',
            certification_id: that.props.certification.id,
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },
  toggleQbPl() {
    this.setState({ showForm: false })
  },
  toggleTracker() {
    this.setState({ showForm: true })
  },
  showForms() {
    var disabled
    if (this.props.yearStatus == 'future' || this.props.yearStatus == 'current') {
      disabled = ' disabled'
    }
    if (this.state.showForm) {
      if (this.props.yearStatus == 'current' && this.props.new_user == true) {
        disabled = ''
      }
      return (
        <div className={'fee-tracker__payments new-form' + disabled}>
          <div className='title'>
            <h3>Create A New Payment</h3>
            <h6 onClick={this.toggleQbPl}>Upload Quickbooks File</h6>
          </div>
          {this.newForm()}
        </div>
      )
    } else {
      var subtitle
      if (this.props.yearStatus == 'current') {
        subtitle = <span className='subtitle'>* at the close of your fiscal year</span>
      }
      return (
        <div className={'fee-tracker__payments ql-pl' + disabled}>
        <div className='title'>
          <h3>Upload Quickbooks File{subtitle}</h3>
          <h6 onClick={this.toggleTracker}>Create A New Payment</h6>
        </div>
         {this.formQbPl()}
        </div>
      )
    }
  },
  formQbPl() {
    var disabled
    if (this.props.yearStatus == 'future' || this.props.yearStatus == 'current') {
      disabled = true
    } else {
      disabled = false
    }
    var qb_pl = <UploadFile
        model={this.props.certification}
        required='true'
        type='qb_pl'
        disabled={disabled}
        handleFileUpdate={this.props.handleCertificationUpdate}
        accept='application/pdf' />
    return qb_pl
  },
  newForm() {
    var that = this
    var options = this.props.fee_categories.map( function(fee_category, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {fee_category.name}
        </option>
      )
    })
    var status = this.props.yearStatus
    var disabled
    if (status == 'future') {
      disabled = true
    }
    var form
    form = <div className="form">
      <div className="form__fields">
        <div className="form-group">
          <label>Date</label>
          <div className="field-group required">
            <input
              disabled={disabled}
              value={this.state.artist_payment.date}
              type="date"
              name='date'
              className="form-control"
              onChange={this.handleInputChange}  />
            <span className="req">*</span>
            <span className="error">{this.state.errors.date}</span>
          </div>
        </div>
        <div className="form-group">
          <label>Artist Name</label>
          <div className="field-group required">
            <input
              disabled={disabled}
              value={this.state.artist_payment.artist_name}
              type="text"
              placeholder="Artist Name"
              name="artist_name"
              onChange={this.handleInputChange}
              className="form-control" />
            <span className="req">*</span>
            <span className="error">{this.state.errors.artist_name}</span>
          </div>
        </div>
        <div className="form-group">
          <label>Program Name</label>
          <div className="field-group required">
            <input
              disabled={disabled}
              type="text"
              value={this.state.artist_payment.name}
              placeholder="Program Name"
              name="name"
              onChange={this.handleInputChange}
              className="form-control"/>
            <span className="req">*</span>
            <span className="error">{this.state.errors.name}</span>
          </div>
        </div>
        <div className="form-group">
          <label>Fee Category</label>
          <div className="field-group">
            <select
              disabled={disabled}
              type='text'
              name='fee_category'
              className='form-control'
              value={this.optionState}
              onChange={this.handleInputChange}>
              {options}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <div className="field-group required">
            <input
              disabled={disabled}
              type="text"
              placeholder="Amount"
              name='amount'
              value={this.state.artist_payment.amount}
              onChange={this.handleInputChange}
              className="form-control"/>
            <span className="req">*</span>
            <span className="error">{this.state.errors.amount}</span>
          </div>
        </div>
        <div className="form-group">
          <label>Check No.</label>
          <div className="field-group">
            <input
              disabled={disabled}
              type="text"
              placeholder="Check No."
              name='check_no'
              value={this.state.artist_payment.check_no}
              onChange={this.handleInputChange}
              className="form-control" />
            <span className="error">{this.state.errors.check_no}</span>
          </div>
                </div>
                  </div>
        <div id="actions" className="field-group">
          <button
            onClick={this.addArtistPayment}
            disabled={disabled}
            className="btn btn-lg"
            >Save <i className="fa fa-plus" aria-hidden="true"></i></button>
      </div>
    </div>
    return form
  },
  showTrackerLink() {
    var link
    if (this.props.yearStatus == 'future') {
      if (this.state.showForm) {
        link = <span>Once your fiscal year has started, you are required to create an entry</span>
      } else {
        link = <span>Once your fiscal year has started, you are required to <a onClick={this.toggleTracker}>create an entry</a></span>
      }
    } else if (!this.state.showForm) {
      link = <a onClick={this.toggleTracker}>Create an entry</a>
    } else {
      link = <span>Create an entry</span>
    }
    return link
  },
  showCurrentNewUser() {
    var current_message
    if (this.props.new_user && this.props.yearStatus == 'current') {
      current_message = <span>You do not need to complete the fee tracker until your fiscal year has ended. </span>
    }
    return current_message
  },
  showQbPlLink() {
    var link
    if (this.state.showForm) {
      link = <span>Alternatively, you may <a onClick={this.toggleQbPl}>upload a Quickbooks P&L.</a></span>
    } else {
      link = <span>Alternatively, you may upload a Quickbooks P&L.</span>
    }
    return link
  },
  paymentsTable() {
    var payments
    if (this.state.showForm) {
      if (this.props.artist_payments && this.props.artist_payments.length > 0) {
        payments = <div className="section artist-payments clearfix">
          <h3 className="section artist-payments__title">Artist Payments</h3>
          <ArtistPaymentsTable
            artist_payments={this.props.artist_payments}
            _sortRowsBy={this.props._sortRowsBy}
            paymentsSorted={this.props.paymentsSorted}
            isEdit="true"
            handleDeleteArtistPayment={this.props.handleDeleteArtistPayment}
            fee_categories={this.props.fee_categories} /></div>
      }
    }
    return payments
  },
  render() {
    return (
      <div className="fee-tracker fee-tracker--new">
        <div className="fee-tracker__intro">
          <h4 className="can-have-payments">Organizations must demonstrate having paid artist fees according to <a onClick={this.props.goFeeSchedule}>W.A.G.E.’s minimum standards of compensation</a> during the fiscal year in which they apply.</h4>
          <h4>{this.showTrackerLink()} for each fee payment to an artist between {this.props.formatted_dates}. {this.showCurrentNewUser()}{this.showQbPlLink()}</h4>
        </div>
        {this.showForms()}
        {this.paymentsTable()}
      </div>
      );
    }
  });
