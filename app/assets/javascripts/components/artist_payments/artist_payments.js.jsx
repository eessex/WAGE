var ArtistPayments = React.createClass({
  getInitialState() {
    return {
      artist_payments: this.props.artist_payments
    }
  },
  handleAddArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments;
    artist_payments.push(artist_payment);
    this.setState({ artist_payments: artist_payments });
  },
  handleDeleteArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    this.setState({artist_payments: artist_payments});
  },
  thisSorted(artist_payments) {
    this.setState({artist_payments: artist_payments});
  },

  render() {
    return (
      <div className="artist_payments">
        <AmountBox artist_payments={this.state.artist_payments} className="amount-box col col-lg-4" />
        <ArtistPaymentNew fee_categories={this.props.fee_categories} formatted_date={this.props.formatted_date} certification={this.props.certification} handleAddArtistPayment={this.handleAddArtistPayment} />
        <ArtistPaymentsTable artist_payments={this.state.artist_payments} fee_categories={this.props.fee_categories} thisSorted={this.thisSorted} handleDeleteArtistPayment={this.handleDeleteArtistPayment}/>
      </div>
    );
  }
});
