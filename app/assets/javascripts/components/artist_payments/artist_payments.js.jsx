var ArtistPayments = React.createClass({
  getInitialState() {
    return {
      artist_payments: this.props.artist_payments,
      artist_payment: {
        name: '',
        artist_name: '',
        date: ''
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
  handleNewArtistPayment() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        artist_payment: that.state.artist_payment,
      },
      url: '/artist_payments.json',
      success: function(res) {
        var newArtistPayment = that.state.artist_payments;
        newArtistPayment.push(res);
        that.setState({
          artist_payments: newArtistPayment,
          artist_payment: {
            name: '',
            artist_name: '',
            description: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleDeleteArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    this.setState({artist_payments: artist_payments});
  },

  render() {
    var that = this;
    var all_payments = <tr>
            <td>Hi</td>
            <td>Hi</td>
            <td>Hi</td>
            <td>Hi</td>
            <td>Hi</td>
            <td>Hi</td>
          </tr>
    var payments_table = <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Artist Name</th>
                    <th>Program Name</th>
                    <th>Fee Category</th>
                    <th>Amount</th>
                    <th>Check No.</th>
                  </tr>
                </thead>
                <tbody>
                  {all_payments}
                </tbody>
              </table>
    return (
      <div>
        <h1>Artist Payments</h1>
          <div id="artist_payments" className="new">
            <div className="form">
              <div className="field-group">
                <label>Date</label>
                <input
                  value={this.state.artist_payment.date}
                  type="date"
                  className="form-control"
                  onChange={this.handleDateChange}  />
                <span style={{color: 'red'}}>{this.state.errors.date}</span>
              </div>
                <div className="field-group">
                <label>Artist Name</label>
                  <input
                    value={this.state.artist_payment.artist_name}
                    type="text"
                    placeholder="Artist Name"
                    onChange={this.handleArtistNameChange}
                    className="form-control" />
                  <span style={{color: 'red'}}>{this.state.errors.artist_name}</span>
                </div>
                <div className="field-group">
                <label>Program Name</label>
                  <input
                    type="text"
                    value={this.state.artist_payment.name}
                    placeholder="Program Name"
                    onChange={this.handleNameChange}
                    className="form-control"/>
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </div>
                <div className="field-group">
                <label>Amount</label>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={this.state.artist_payment.amount}
                    onChange={this.handleAmountChange}
                    className="form-control"/>
                  <span style={{color: 'red'}}>{this.state.errors.amount}</span>
                </div>
                <div className="field-group">
                <label>Check No.</label>
                  <input
                    type="text"
                    placeholder="Check No."
                    value={this.state.artist_payment.check_no}
                    onChange={this.handleCheckNoChange}
                    className="form-control"/>
                  <span style={{color: 'red'}}>{this.state.errors.check_no}</span>
                </div>
                <div className="field-group"><button onClick={this.handleAddArtistPayment}>Add</button></div>
              </div>
          </div>
          {payments_table}
        </div>
    );
  }
});
