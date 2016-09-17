var AmountBox = React.createClass({
  totals: function(artist_payments) {
    var total_payments = artist_payments.reduce(function(a, b) {
      return a + parseInt(b.amount);
    }, 0);
    var all_artists = []
    var get_artists = artist_payments.map( function(artist_payment) {
      all_artists.push(artist_payment.artist_name)
    })
    var unique_artists = all_artists.filter(function(name, i) {
      return all_artists.indexOf(name) == i;
    });
    var total_artists = unique_artists.length;

    var all_programs = []
    var get_programs = artist_payments.map( function(artist_payment) {
      all_programs.push(artist_payment.name)
    })
    var total_programs = get_programs.length

  return {
    total_payments: total_payments,
    total_artists: total_artists,
    total_programs: total_programs
    }
  },

  render: function() {
   var total_payments = this.totals(this.props.artist_payments).total_payments;
   var total_artists = this.totals(this.props.artist_payments).total_artists;
   var total_programs = this.totals(this.props.artist_payments).total_programs;
   var formatted_total = '$' + Number(total_payments).toLocaleString();

    return (
      <div key="amount-box" className="stats offset-lg-2 col-lg-4">
        <p><span className="hightlight">{formatted_total}</span> total fees paid</p>
        <p>to <span className="hightlight">{total_artists}</span> artists for <span className="hightlight">{total_programs}</span> programs.</p>
      </div>
    );
  }
});
