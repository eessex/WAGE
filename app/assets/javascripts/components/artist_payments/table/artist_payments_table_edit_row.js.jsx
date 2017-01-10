var ArtistPaymentsTableEditRow = React.createClass({
  getInitialState() {
    return {
      artist_payment: this.props.artist_payment,
      editMode: false,
      errors: {}
    }
  },
  handleInputChange(e) {
    var newPayment = this.state.artist_payment
    newPayment[e.target.name] = e.target.value
    this.setState({artist_payment: newPayment})
    this.fulfilsRequired(e)
  },
  handleArtistPaymentUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        artist_payment: that.state.artist_payment,
      },
      url: '/artist_payments/' + that.state.artist_payment.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          artist_payment: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleDeleteArtistPayment(artist_payment) {
    var r = confirm("Are you sure?");
    if (r == true) {
      var that = this;
      $.ajax({
        method: 'DELETE',
        url: '/artist_payments/' + that.state.artist_payment.id + '.json',
        success: function(res) {
          that.props.deleteArtistPayment(that.state.artist_payment);
        }
      })
    }
  },
  setEditMode() {
    this.setState({editMode: true});
  },
  render() {
    var options = this.props.fee_categories.map( function(fee_category, i) {
      var index = i + 1
      return (
        <option key={index} value={index}>
          {fee_category.name}
        </option>
      )
    })
    var cat_index = this.state.artist_payment.fee_category_id - 1
    var fee_category_name = this.props.fee_categories[cat_index].name
    var fee_category_floor = this.props.fee_categories[cat_index].floor_fee
    var formatted_date = moment(this.props.artist_payment.date).format('MM/DD/Y');
    var formatted_amount = '$' + Number(this.props.artist_payment.amount).toLocaleString();

    if ( !this.state.editMode ) {
       payment_row = (
        <tr key={this.state.artist_payment.id}>
          <td className="first">{formatted_date}</td>
          <td>{this.state.artist_payment.artist_name}</td>
          <td>{this.state.artist_payment.name}</td>
          <td>{fee_category_name}</td>
          <td>{formatted_amount} <ArtistPaymentsFeeComparison artist_payment={this.state.artist_payment} floor_fee={fee_category_floor}/></td>
          <td>{this.state.artist_payment.check_no}</td>
          <td className="last">
            <button onClick={this.setEditMode} className="btn">Edit</button>
            <button onClick={this.handleDeleteArtistPayment} className="btn btn-danger"><i className="fa fa-trash"></i></button>
          </td>
       </tr>
     );
    } else {
      payment_row = (
           <tr key={this.state.artist_payment.id}>
             <td className="first field-group">
               <input
                 type="date"
                 className="form-control"
                 name='date'
                 value={this.state.artist_payment.date}
                 onChange={this.handleInputChange} />
               <span className='error'>{this.state.errors.date}</span>
             </td>
             <td className="field-group">
               <input
                 type="text"
                 className="form-control"
                 name='artist_name'
                 value={this.state.artist_payment.artist_name}
                 onChange={this.handleInputChange} />
               <span className='error'>{this.state.errors.artist_name}</span>
             </td>
             <td className="field-group">
               <input
                 type="text"
                 className="form-control"
                 name='name'
                 value={this.state.artist_payment.name}
                 onChange={this.handleInputChange} />
               <span className='error'>{this.state.errors.name}</span>
             </td>
             <td className="field-group">
               <select
                 type='text'
                 className='form-control'
                 name='fee_category_id'
                 value={this.optionState}
                 onChange={this.handleInputChange}>
                 {options}
               </select>
             </td>
             <td className="field-group">
               <input
                 type="text"
                 className="form-control"
                 name='amount'
                 value={this.state.artist_payment.amount}
                 onChange={this.handleInputChange} />
               <span className='error'>{this.state.errors.amount}</span>
             </td>
             <td className="field-group">
               <input
                 type="text"
                 className="form-control"
                 name='check_no'
                 value={this.state.artist_payment.check_no}
                 onChange={this.handleInputChange} />
               <span className='error'>{this.state.errors.check_no}</span>
             </td>
             <td className="last">
               <button onClick={this.handleArtistPaymentUpdate} className="btn">Save</button>
             </td>
          </tr>
        )
      }
    return payment_row;
  }
})
