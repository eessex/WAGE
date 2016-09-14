var CertificationSubmitView = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments
    }
  },
  render() {
    var artist_payments = this.state.artist_payments.map( function(artist_payment, i) {
      var payment_row =
                <tr key={artist_payment.id}>
                   <td className="first">{artist_payment.date}</td>
                   <td>{artist_payment.artist_name}</td>
                   <td>{artist_payment.name}</td>
                   <td>{artist_payment.fee_category_id}</td>
                   <td>{artist_payment.amount}</td>
                   <td>{artist_payment.check_no}</td>
                </tr>

      var index = i + 1
      return (
        <table className="table">
          <thead>
            <tr>
              <th className="first">Date</th>
              <th>Artist Name</th>
              <th>Program Name</th>
              <th>Fee Category</th>
              <th>Amount</th>
              <th>Check No.</th>
            </tr>
          </thead>
          <tbody>
            {payment_row}
          </tbody>
        </table>
      )
    })


    return (
      <div className="certification submit-view container">
        <h3>{this.state.user.institution_name}</h3>
        <div className="section contact">
          <h4>Contact Information</h4>
          <ul>
            <li>{this.state.user.website}</li>
            <li>{this.state.user.rep_name}, {this.state.user.rep_title}</li>
            <li>{this.state.user.email}</li>
            <li>{this.state.user.phone}</li>
          </ul>
          <ul>
            <li>{this.state.user.address_st1}, {this.state.user.address_st2}</li>
            <li>{this.state.user.address_city}, {this.state.user.address_state} {this.state.user.address_zip}</li>
          </ul>
        </div>
        <div className="section statement">
          <h4>Statement of Interest</h4>
          <p>{this.state.user.statement}</p>
        </div>
        <div className="section financials">
          <h4>Financial Details <small>Fiscal Year </small></h4>
          <li><strong>Operating Expenses:</strong> {this.state.certification.operating_expenses}</li>
          <li><strong>Budgeted Artist Fees:</strong> {this.state.certification.ant_artist_expenses}</li>
          <li><strong>Operating Budget:</strong> {this.state.certification.file_990}</li>
          <li><strong>File 990:</strong> {this.state.certification.file_990}</li>
        </div>
        <div className="section artist-fees">
          <h4>Artist Fees</h4>
          <AmountBox artist_payments={this.props.artist_payments} />
          {artist_payments}
        </div>
      </div>
    );
  }
});
