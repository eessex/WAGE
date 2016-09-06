var ArtistPaymentsTable = React.createClass({
  getInitialState() {
    return {
      artist_payments: this.props.artist_payments
    }
  },
  handleDeleteArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    this.setState({artist_payments: artist_payments});
  },
  render() {
    var that = this
    var payment_row = this.state.artist_payments.map( function(artist_payment) {
         return (
               <ArtistPaymentsTableRow key={artist_payment.id} deleteArtistPayment={that.handleDeleteArtistPayment} artist_payment={artist_payment} fee_categories={that.props.fee_categories} />
              )
    })
    var payments_table = <table className="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th className="first">Date</th>
                    <th>Artist Name</th>
                    <th>Program Name</th>
                    <th>Fee Category</th>
                    <th>Amount</th>
                    <th>Check No.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payment_row}
                </tbody>
              </table>
    return (
      payments_table
    );
  }
});



var ArtistPaymentsTableRow = React.createClass({
  getInitialState() {
    return {
      artist_payment: this.props.artist_payment,
      editMode: false,
      errors: {}
    }
  },
  handleNameChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.name = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },

  handleArtistNameChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.artist_name = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleDateChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.date = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleAmountChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.amount = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleCheckNoChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.check_no = e.target.value
    this.setState({artist_payment: newArtistPayment});
  },
  handleFeeCategoryChange(e) {
    var newArtistPayment = this.state.artist_payment
    newArtistPayment.fee_category_id = e.target.value
    this.setState({artist_payment: newArtistPayment});
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
          {fee_category}
        </option>
      )
    })
    var cat_index = this.state.artist_payment.fee_category_id - 1
    var fee_category_name = this.props.fee_categories[cat_index]
    var formatted_date = moment(this.props.artist_payment.date).format('MM/DD/Y');
    var formatted_amount = '$' + Number(this.props.artist_payment.amount).toLocaleString();

    if ( !this.state.editMode ) {
       payment_row = (
        <tr key={this.state.artist_payment.id}>
          <td className="first">{formatted_date}</td>
          <td>{this.state.artist_payment.artist_name}</td>
          <td>{this.state.artist_payment.name}</td>
          <td>{fee_category_name}</td>
          <td>{formatted_amount}</td>
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
                 value={this.state.artist_payment.date}
                 onChange={this.handleDateChange}
                 />
               <span style={{color: 'red'}}>{this.state.errors.date}</span>
             </td>
             <td className="field-group">
               <input
                 type="text"
                 className="form-control"
                 value={this.state.artist_payment.artist_name}
                 onChange={this.handleArtistNameChange}
                 />
               <span style={{color: 'red'}}>{this.state.errors.artist_name}</span>
             </td>
             <td className="field-group">
               <input
                 type="text"
                 className="form-control"
                 value={this.state.artist_payment.name}
                 onChange={this.handleNameChange}
                 />
               <span style={{color: 'red'}}>{this.state.errors.name}</span>
             </td>
             <td className="field-group">
             <select
               type='text'
               className='form-control'
               value={this.optionState}
               onChange={this.handleFeeCategoryChange}
               >
               {options}
             </select>
             </td>
             <td>{this.state.artist_payment.amount}</td>
             <td>{this.state.artist_payment.check_no}</td>
             <td className="last">
               <button onClick={this.handleArtistPaymentUpdate} className="btn">Save</button>
             </td>
          </tr>
        )
      }
    return payment_row;
  }
})
