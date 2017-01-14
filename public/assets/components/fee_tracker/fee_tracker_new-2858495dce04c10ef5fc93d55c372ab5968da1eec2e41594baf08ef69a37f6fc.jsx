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
  newForm() {
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
    if (status == 'future' || this.props.new_user == true) {
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
              name='fee_category_id'
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
  render() {
    return this.newForm()
    }
  });
