var ArtistPaymentNew = React.createClass({
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
        that.props.handleAddArtistPayment(that.state.artist_payment);
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
  render() {
    var that = this
    var options = this.props.fee_categories.map( function(fee_category, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {fee_category.name}
        </option>
      )
    })
    return (
      <div id="artist_payments" className="artist_payments new container">
        <div className="intro">
            <h1><span>Artist Payments</span></h1>
            <h4>Please fill in the fields below detailing your history of fee payments to artists between {this.props.formatted_dates()}. </h4>
        </div>
        <div className="form">
          <div className="col col-md-3 col-lg-6">
          <div className="form-group">
            <label>Date</label>
            <input
              value={this.state.artist_payment.date}
              type="date"
              className="form-control"
              onChange={this.handleDateChange}  />
            <span style={{color: 'red'}}>{this.state.errors.date}</span>
          </div>
            <div className="form-group">
            <label>Artist Name</label>
              <input
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
                type="text"
                value={this.state.artist_payment.name}
                placeholder="Program Name"
                onChange={this.handleNameChange}
                className="form-control"/>
              <span style={{color: 'red'}}>{this.state.errors.name}</span>
            </div>
          </div>

          <div className="col col-md-3 col-lg-6">
            <div className="form-group">
              <label>Fee Category</label>
              <select
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
                type="text"
                placeholder="Check No."
                value={this.state.artist_payment.check_no}
                onChange={this.handleCheckNoChange}
                className="form-control" />
              <span style={{color: 'red'}}>{this.state.errors.check_no}</span>
            </div>
          </div>
          <div id="actions" className="field-group"><button onClick={this.addArtistPayment} className="btn btn-lg">Add New Payment</button><p>If you prefer to submit a Quickbooks P&L, upload it <a href="/#">HERE</a>.</p></div>
        </div>
      </div>
      );
    }
  });
