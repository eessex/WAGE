var ArtistPaymentsTable = React.createClass({
  getInitialState() {
    var totals = this.totals(this.props.artist_payments)
    return {
      total_payments: totals.total_payments,
      total_artists: totals.total_artists,
      total_programs: totals.total_programs,
      total_categories: totals.total_categories
    }
  },
  sortRowsBy(event) {
    this.props.sortRowsBy(event)
  },
  handleDeleteArtistPayment(artist_payment) {
    this.props.handleDeleteArtistPayment(artist_payment);
  },
  handleArtistPaymentUpdate(artist_payment) {
    var totals = this.totals(this.props.artist_payments)
    this.setState({
      total_payments: totals.total_payments,
      total_artists: totals.total_artists,
      total_programs: totals.total_programs,
      total_categories: totals.total_categories
    })
    this.props.handleArtistPaymentUpdate(artist_payment)
  },
  paymentRow() {
    var that = this
    var row
    var payment_row = this.props.artist_payments.map( function(artist_payment) {
      if (that.props.isEdit == 'true') {
        row = <ArtistPaymentsTableEditRow
                key={artist_payment.id}
                deleteArtistPayment={that.props.handleDeleteArtistPayment}
                handleArtistPaymentUpdate={that.handleArtistPaymentUpdate}
                artist_payment={artist_payment}
                fee_categories={that.props.fee_categories} />
      } else {
        row = <ArtistPaymentsTableRow
                key={artist_payment.id}
                deleteArtistPayment={that.props.handleDeleteArtistPayment}
                artist_payment={artist_payment}
                fee_categories={that.props.fee_categories} />
      }
      return row
    })
    return payment_row
  },
  totals(artist_payments) {
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
    var total_programs = unique_programs.length;

    var all_categories = []
    var get_categories = artist_payments.map( function(artist_payment) {
      all_categories.push(artist_payment.fee_category_id)
    })
    var unique_categories = all_categories.filter(function(id, i) {
      return all_categories.indexOf(id) == i;
    });
    var total_categories = unique_categories.length;

  return {
    total_payments: total_payments,
    total_artists: total_artists,
    total_programs: total_programs,
    total_categories: total_categories
    }
  },
  paymentFoot() {
    var foot
    var format_payments
    var format_artists
    var format_programs
    var format_categories
    var has_actions
    if (this.props.artist_payments.length > 1) {
      format_payments = 's'
    }
    if (this.state.total_artists > 1) {
      format_artists = 's'
    }
    if (this.state.total_programs > 1) {
      format_programs = 's'
    }
    if (this.state.format_categories > 1) {
      format_categories = 'Categories'
    } else {
      format_categories = 'Category'
    }
    if (this.props.isEdit == 'true') {
      has_actions = <td></td>
    }
    if (this.props.artist_payments.length > 0) {
      foot = <tfoot>
          <tr>
            <td className="sortable first" name="date">{this.props.artist_payments.length} Payment{format_payments}</td>
            <td className="sortable" name="artist_name">{this.state.total_artists} Artist{format_artists}</td>
            <td className="sortable" name="name">{this.state.total_programs} Program{format_programs}</td>
            <td className="sortable" name="fee_category_id">{this.state.total_categories} {format_categories}</td>
            <td className="total--amount" name="amount">${this.state.total_payments} Total Fees</td>
            <td></td>
          </tr>
        </tfoot>
    }
    return foot
  },
  actions() {
    var actions
    if (this.props.isEdit == "true") {
      actions = <th className="actions">Actions</th>
    }
    return actions
  },
  render() {
    var payments_table = <table id="artist_payments" className="artist-payments--table table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th className="sortable first" name="date" onClick={this.sortRowsBy}>Date<i className="fa fa-sort"></i></th>
            <th className="sortable" name="artist_name" onClick={this.sortRowsBy}>Artist Name<i className="fa fa-sort"></i></th>
            <th className="sortable" name="name" onClick={this.sortRowsBy}>Program/Exhibition<i className="fa fa-sort"></i></th>
            <th className="sortable" name="fee_category_id" onClick={this.sortRowsBy}>Fee Category<i className="fa fa-sort"></i></th>
            <th className="sortable" name="amount" onClick={this.sortRowsBy}>Amount<i className="fa fa-sort"></i></th>
            <th className="sortable" name="check_no" onClick={this.sortRowsBy}>Check #<i className="fa fa-sort"></i></th>
            {this.actions()}
          </tr>
        </thead>
        {this.paymentFoot()}
        <tbody>
          {this.paymentRow()}
        </tbody>
      </table>
    return (
      payments_table
    );
  }
});
