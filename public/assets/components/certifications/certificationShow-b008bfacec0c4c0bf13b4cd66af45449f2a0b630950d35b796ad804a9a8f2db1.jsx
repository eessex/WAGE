var CertificationShow = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments,
      sortBy: 'date',
      sortDir: 'ASC'
    }
  },
  _sortRowsBy(event) {
    var sortDir = this.state.sortDir;
    var sortBy = event.target.className.split(' ')[0];
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir == 'ASC' ? 'DESC' : 'ASC';
    } else {
     sortDir = 'ASC';
    }
    var artist_payments = this.state.artist_payments.slice();
    artist_payments.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }
      if (sortDir === 'DESC') {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });
    this.setState({sortBy, sortDir});
    this.setState({artist_payments: artist_payments});
    // this.state.paymentsSorted(artist_payments);
    $('th').removeClass('active')
    $(event.target).addClass('active').toggleClass('ASC')
  },
  handleAddArtistPayment(artist_payment) {
    artist_payments = this.state.artist_payments
    artist_payments.push(artist_payment)
    this.setState({artist_payments: artist_payments})
  },
  handleDeleteArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    this.setState({artist_payments: artist_payments})
  },
  paymentsSorted(artist_payments) {
    this.setState({artist_payments: artist_payments});
  },
  formatDates() {
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_start).format('Y') ) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    } return formatted_date
  },
  formatOperatingExpenses() {
    return this.state.certification.operating_expenses.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  },
  getArtistPayments() {
    if (this.state.artist_payments) {
      var payments = <ArtistPaymentsTable artist_payments={this.state.artist_payments} _sortRowsBy={this._sortRowsBy} paymentsSorted={this.paymentsSorted} handleDeleteArtistPayment={this.handleDeleteArtistPayment} fee_categories={this.props.fee_categories}/>
    } else {
      var payments
    }
    return payments
  },
  render() {
    return (
      <div id="certification" className="show">
        <h3><span className="title">Certification: FY {moment(this.state.certification.fiscal_start).format('YYYY')}</span></h3>
        <AmountBox artist_payments={this.state.artist_payments} certification={this.state.certification} />
        <div className="status-img"><img src="https://s3.amazonaws.com/wagency/WAGE-Pending-Logo.png"/></div>
        <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} certification={this.state.certification} fee_categories={this.props.fee_categories} formatted_dates={this.formatDates}/>
        {this.getArtistPayments()}
      </div>
    )
  }
});

// var artist_payments = this.state.artist_payments.map( function(artist_payment, i) {
//   var payment_row =
//             <tr key={artist_payment.id}>
//                <td className="first">{artist_payment.date}</td>
//                <td>{artist_payment.artist_name}</td>
//                <td>{artist_payment.name}</td>
//                <td>{artist_payment.fee_category_id}</td>
//                <td>{artist_payment.amount}</td>
//                <td>{artist_payment.check_no}</td>
//             </tr>
//
//   var index = i + 1
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th className="first">Date</th>
//           <th>Artist Name</th>
//           <th>Program Name</th>
//           <th>Fee Category</th>
//           <th>Amount</th>
//           <th>Check No.</th>
//         </tr>
//       </thead>
//       <tbody>
//         {payment_row}
//       </tbody>
//     </table>
//   )
// })
//
//
// if (this.state.certification.status == 0 ) {
//   var formatted_status = <span className="in-progress">In Progress</span>
// } else if (this.state.certification.status == 1 ) {
//   var formatted_status = <span className="submit">Ready To Submit</span>
// }
//
// if ( this.state.submitMode ) {
//   var submit = ( <div>
//       <button onClick={this.handleCertificationUpdate} className="btn">Submit</button>
//     </div>
//   );
// };
//
// if ( this.state.previewMode ) {
//   var preview = (
//     <div className="preview">
//       <CertificationSubmitView certification={this.state.certification} user={this.state.user} artist_payments={this.state.artist_payments}/>
//     </div>
//   );
// } else {
//   var edit_mode = (
//     <div className="edit">
//       <CertificationFinancials certification={this.state.certification} />
//     </div>
//   )
// };
// if ( this.state.previewMode ) {
//   var editButton = "Edit"
// } else {
//   var editButton = "Preview"
// }
//
// var row = (
//     <div key={this.state.certification.id}>
//       <div className="title">
//       <div className="page-header">
//         <h2>Application</h2>
//         <div>
//           <h5 className="header">For fiscal year</h5>
//           <h4>{formatted_date}</h4>
//         </div>
//       </div>
//       <div className="status">
//         <h4 className="status">{formatted_status} <button onClick={this.togglePreviewMode} className="btn">{editButton}</button></h4>
//         {submit}
//       </div>
//       </div>
//       <div className="body ">
//         {preview}
//         {edit_mode}
//         <ArtistPayments artist_payments={this.state.artist_payments} formatted_date={formatted_date} previewMode={this.state.previewMode} certification={this.state.certification} fee_categories={this.props.fee_categories}/>
//       </div>
//     </div>
//   );
// return row;
