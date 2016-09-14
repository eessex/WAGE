var AmountBox = React.createClass({
  getInitialState() {
    var totals = this.totals(this.props.artist_payments);
    return {
      artist_payments: this.props.artist_payments,
      total_payments: totals.total_payments,
      total_artists: totals.total_artists,
      total_programs: totals.total_programs
      // sortBy: 'date',
      // sortDir: null
    }
  },
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
    var unique_programs = all_programs.filter(function(name, i) {
      return all_programs.indexOf(name) == i;
    });
    var total_programs = unique_programs.length

  return {
    total_payments: total_payments,
    total_artists: total_artists,
    total_programs: total_programs
    }
  },

  render: function() {

   var formatted_total = '$' + Number(this.state.total_payments).toLocaleString();
    return (
      <div className="stats offset-lg-2 col-lg-4">
        <p><span className="hightlight">{formatted_total}</span> total fees paid</p>
        <p>to <span className="hightlight">{this.state.total_artists}</span> artists for <span className="hightlight">{this.state.total_programs}</span> programs.</p>
      </div>
    );
  }
});
