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
    // this.props.handleUserUpdate(newPayment)
    // this.fulfilsRequired(e)
  },
  handleNameChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.name = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleArtistNameChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.artist_name = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleDateChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.date = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleAmountChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.amount = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleCheckNoChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.check_no = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleFeeCategoryChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.fee_category_id = e.target.value
    this.setState({artist_payment: newArtistPayment});
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
    if (this.props.yearStatus == 'future') {
      disabled = ' disabled'
    }
    if (this.state.showForm) {
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
      return (
        <div className={'fee-tracker__payments ql-pl' + disabled}>
        <div className='title'>
          <h3>Upload Quickbooks File</h3>
          <h6 onClick={this.toggleTracker}>Create A New Payment</h6>
        </div>
         {this.formQbPl()}
        </div>
      )
    }
  },
  formQbPl() {
    var disabled
    if (this.props.yearStatus == 'future') {
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
      <div className="form">
        <div className="col col-xs-12 col-md-6">
          <div className="form-group">
            <label>Date</label>
            <input
              disabled={disabled}
              value={this.state.artist_payment.date}
              type="date"
              className="form-control"
              onChange={this.handleDateChange}  />
            <span style={{color: 'red'}}>{this.state.errors.date}</span>
          </div>
            <div className="form-group">
            <label>Artist Name</label>
              <input
                disabled={disabled}
                value={this.state.artist_payment.artist_name}
                type="text"
                placeholder="Artist Name"
                onChange={this.handleArtistNameChange}
                className="form-control" />
              <span style={{color: 'red'}}>{this.state.errors.artist_name}</span>
            </div>
            <div className="form-group">
            <label>Program Name</label>
              <input
                disabled={disabled}
                type="text"
                value={this.state.artist_payment.name}
                placeholder="Program Name"
                onChange={this.handleNameChange}
                className="form-control"/>
              <span style={{color: 'red'}}>{this.state.errors.name}</span>
            </div>
          </div>
        <div className="col col-xs-12 col-md-6">
          <div className="form-group">
            <label>Fee Category</label>
            <select
              disabled={disabled}
              type='text'
              className='form-control'
              value={this.optionState}
              onChange={this.handleFeeCategoryChange}
              >
              {options}
            </select>
          </div>
          <div className="form-group">
          <label>Amount</label>
            <input
              disabled={disabled}
              type="text"
              placeholder="Amount"
              value={this.state.artist_payment.amount}
              onChange={this.handleAmountChange}
              className="form-control"/>
            <span style={{color: 'red'}}>{this.state.errors.amount}</span>
          </div>
          <div className="form-group">
          <label>Check No.</label>
            <input
              disabled={disabled}
              type="text"
              placeholder="Check No."
              value={this.state.artist_payment.check_no}
              onChange={this.handleCheckNoChange}
              className="form-control" />
            <span style={{color: 'red'}}>{this.state.errors.check_no}</span>
          </div>
        </div>
        <div id="actions" className="field-group"><button onClick={this.addArtistPayment} disabled={disabled} className="btn btn-lg">Save <i className="fa fa-plus" aria-hidden="true"></i></button></div>
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
    } else if (this.state.showForm) {
      link = <a onClick={this.toggleTracker}>Create an entry</a>
    } else {
      link = <span>Create an entry</span>
    }
    return link
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
  render() {
    return (
      <div className="fee-tracker fee-tracker--new">
        <div className="fee-tracker__intro">
          <h4 className="can-have-payments">Organizations must demonstrate having paid artist fees according to <a onClick={this.props.goFeeSchedule}>W.A.G.E.’s minimum standards of compensation</a> during the fiscal year in which they apply.</h4>
          <h4>{this.showTrackerLink()} for each fee payment to an artist between {this.props.formatted_dates}. Alternatively, you may {this.showQbPlLink()}</h4>
        </div>
        {this.showForms()}
      </div>
      );
    }
  });
