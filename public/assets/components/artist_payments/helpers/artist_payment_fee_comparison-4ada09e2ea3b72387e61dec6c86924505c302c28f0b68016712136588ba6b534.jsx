var ArtistPaymentsFeeComparison = React.createClass({
  percentDiff(amount, fee) {
      var diff = amount - fee
      var percent = (diff / fee) * 100
      if ( percent > 0 ) {
        return ( <span className="diff over">+{percent.toFixed(2)}%</span> )
      } else {
        return ( <span className="diff under">{percent.toFixed(2)}%</span> )
      }
  },

  render() {
    var difference = this.percentDiff( this.props.artist_payment.amount, this.props.floor_fee )
    return difference
  }
})
