var ArtistPaymentsTableRow = React.createClass({
  render() {
    var options = this.props.fee_categories.map( function(fee_category, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {fee_category.name}
        </option>
      )
    })
    var cat_index = this.props.artist_payment.fee_category_id - 1
    var fee_category_name = this.props.fee_categories[cat_index].name
    var fee_category_floor = this.props.fee_categories[cat_index].floor_fee
    var formatted_date = moment(this.props.artist_payment.date).format('MM/DD/Y');
    var formatted_amount = '$' + Number(this.props.artist_payment.amount).toLocaleString();
    var payment_row = (
        <tr key={this.props.artist_payment.id}>
          <td className="first">{formatted_date}</td>
          <td>{this.props.artist_payment.artist_name}</td>
          <td>{this.props.artist_payment.name}</td>
          <td>{fee_category_name}</td>
          <td>{formatted_amount} <ArtistPaymentsFeeComparison artist_payment={this.props.artist_payment} floor_fee={fee_category_floor}/></td>
          <td>{this.props.artist_payment.check_no}</td>
          <td><div className="notes">{this.props.artist_payment.notes}</div></td>
       </tr>
     );
    return payment_row;
  }
})
