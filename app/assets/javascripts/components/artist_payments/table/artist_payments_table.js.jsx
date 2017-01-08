var ArtistPaymentsTable = React.createClass({
  sortRowsBy(event) {
    this.props.sortRowsBy(event)
  },
  handleDeleteArtistPayment(artist_payment) {
    this.props.handleDeleteArtistPayment(artist_payment);
  },
  paymentRow() {
    var that = this
    var row
    var payment_row = this.props.artist_payments.map( function(artist_payment) {
      if (that.props.isEdit == 'true') {
        row = <ArtistPaymentsTableEditRow
                key={artist_payment.id}
                deleteArtistPayment={that.props.handleDeleteArtistPayment}
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
        <tbody>
          {this.paymentRow()}
        </tbody>
      </table>
    return (
      payments_table
    );
  }
});
