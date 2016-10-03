var CertificationSubmitView = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments
    }
  },
  handleSubmit() {
    this.props.handleSubmit(this.props.certification)
  },
  render() {
    // var payment_row
    // = this.props.artist_payments.map( function(artist_payment) {
    //      return (
    //        <tr key={artist_payment.id}>
    //           <td className="first">{artist_payment.date}</td>
    //           <td>{artist_payment.artist_name}</td>
    //           <td>{artist_payment.name}</td>
    //           <td>{artist_payment.fee_category_id}</td>
    //           <td>{artist_payment.amount}</td>
    //           <td>{artist_payment.check_no}</td>
    //        </tr>
    //     )
    // })
    // var artist_payments = <table className="table table-responsive">
    //             <thead>
    //               <tr>
    //                 <th className="first">Date</th>
    //                 <th>Artist Name</th>
    //                 <th>Program Name</th>
    //                 <th>Fee Category</th>
    //                 <th>Amount</th>
    //                 <th>Check No.</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //             </tbody>
    //           </table>
    return (
      <div id="review" className="certification">
        <h4>Application for W.A.G.E. Certification</h4>
        <h2>FY 2016: {this.state.user.institution_name}</h2>
        <div className="section contact clearfix">
          <h3>Contact Information</h3>
          <div className="col-lg-6">
            <p>{this.state.user.rep_name}, {this.state.user.rep_title}</p>
            <p>{this.state.user.email}</p>
            <p>{this.state.user.phone}</p>
          </div>
          <div className="col-lg-6">
            <p>{this.state.user.address_st1}, {this.state.user.address_st2}</p>
            <p>{this.state.user.address_city}, {this.state.user.address_state} {this.state.user.address_zip}</p>
            <p>{this.state.user.website}</p>
          </div>
        </div>
        <div className="section financials clearfix">
          <h3>Financial Details</h3>
          <p><strong>Operating Expenses:</strong> {this.props.certification.operating_expenses}</p>
          <p><strong>File 990:</strong> {this.props.certification.file_990}</p>
          <p><strong>File Budget:</strong> {this.props.certification.file_budget}</p>
        </div>
        <div className="section statement clearfix">
          <h3>Statement of Interest</h3>
          <p>{this.state.user.statement}</p>
        </div>
        <button className="btn btn-lg save" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
});
