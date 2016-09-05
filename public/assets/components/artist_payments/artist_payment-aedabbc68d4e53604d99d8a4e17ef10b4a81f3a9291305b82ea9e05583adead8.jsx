var ArtistPayment = React.createClass({
  getInitialState() {
    return {
      artist_payment: this.props.artist_payment,
      editMode: false,
      errors: {}
    }
  },

  setEditMode() {
    this.setState({editMode: true});
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

  toggleDateStatus: function () {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.date = !this.state.artist_payment.date
    this.handleArtistPaymentUpdate();
  },

  handleArtistPaymentUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        artist_payment: that.state.artist_payment,
      },
      url: '/artist_payments/' + that.state.artist_payment.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          artist_payment: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleArtistPaymentDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/artist_payments/' + that.state.artist_payment.id + '.json',
      success: function(res) {
        that.props.onDeleteArtistPayment(that.state.artist_payment);
      }
    })
  },

  render() {
    if ( this.state.editMode ) {
      markup = (
        <tr>
          <td>
            <input
              type="text"
              value={this.state.artist_payment.name}
              onChange={this.handleNameChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td>
          <td>
            <input
              type="text"
              value={this.state.artist_payment.artist_name}
              onChange={this.handleArtistNameChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.artist_name}</span>
          </td>
          <td>
            <textarea
              value={this.state.artist_payment.date}
              onChange={this.handleDateChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.date}</span>
          </td>
          <td>
            <button onClick={this.handleArtistPaymentUpdate}>Save</button>
            <button onClick={this.handleArtistPaymentDelete} style={{color: 'red'}}>Delete</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.artist_payment.name}</td>
          <td>{this.state.artist_payment.artist_name}</td>
          <td>{this.state.artist_payment.date}</td>
          <td>
            <button onClick={this.setEditMode}>Edit</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
});
