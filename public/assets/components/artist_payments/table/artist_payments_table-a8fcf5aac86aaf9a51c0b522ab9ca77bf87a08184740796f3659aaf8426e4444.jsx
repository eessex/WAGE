var ArtistPaymentsTable = React.createClass({
  getInitialState() {
    return {
      artist_payments: this.props.artist_payments,
      sortBy: 'date',
      sortDir: 'ASC'
    }
  },
  _sortRowsBy(event) {
    this.props._sortRowsBy(event)
  },
  handleDeleteArtistPayment(artist_payment) {
    this.props.handleDeleteArtistPayment(artist_payment);
  },
  paymentRow() {
    var that = this
    var row
    var payment_row = this.props.artist_payments.map( function(artist_payment) {
      if (that.props.isEdit == 'true') {
        row = <ArtistPaymentsTableEditRow key={artist_payment.id} deleteArtistPayment={that.handleDeleteArtistPayment} artist_payment={artist_payment} fee_categories={that.props.fee_categories} />
      } else {
        row = <ArtistPaymentsTableRow key={artist_payment.id} deleteArtistPayment={that.handleDeleteArtistPayment} artist_payment={artist_payment} fee_categories={that.props.fee_categories} />
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
    var payments_table = <table id="artist_payments" className="table table-responsive table-striped table-hover">
                <thead>
                  <tr>
                  <th className="date first" onClick={this._sortRowsBy}>Date</th>
                  <th className="artist_name" onClick={this._sortRowsBy}>Artist Name</th>
                  <th className="name" onClick={this._sortRowsBy}>Program/Exhibition</th>
                  <th className="fee_category_id" onClick={this._sortRowsBy}>Fee Category</th>
                  <th className="amount" onClick={this._sortRowsBy}>Amount</th>
                  <th className="check_no" onClick={this._sortRowsBy}>Check #</th>
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
