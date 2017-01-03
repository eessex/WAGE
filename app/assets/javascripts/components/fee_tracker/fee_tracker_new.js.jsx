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
  formQbPl() {
    var qb_pl = <QbPl certification={this.props.certification} handleCertificationUpdate={this.props.handleCertificationUpdate} yearStatus={this.props.yearStatus} />
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
      <UploadFile
        model={this.props.certification}
        required='true'
        type='qb_pl'
        handleFileUpdate={this.props.handleCertificationUpdate}
        accept='application/pdf' />
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
        <div id="actions" className="field-group"><button onClick={this.addArtistPayment} disabled={disabled} className="btn btn-lg"><i className="fa fa-plus" aria-hidden="true"></i> Create New Payment</button></div>
      </div>
    </div>
    return form
  },
  render() {
    if (this.props.yearStatus == 'future') {
      var isStarted = "Once your fiscal year has started, c"
    } else {
      var isStarted = "C"
    }
    return (
      <div id="artist_payments" className="fee-tracker fee-tracker__new-form">
        <div className="intro">
          <h4 className="can-have-payments">Organizations must demonstrate having paid artist fees according to W.A.G.E.’s minimum standards of compensation during the fiscal year in which they apply.</h4>
          <h4>{isStarted}reate an entry for each fee payment to an artist between {this.props.formatted_dates}. Alternatively, you may submit a Quickbooks P&L.</h4>
        </div>
        {this.newForm()}
      </div>
      );
    }
  });
