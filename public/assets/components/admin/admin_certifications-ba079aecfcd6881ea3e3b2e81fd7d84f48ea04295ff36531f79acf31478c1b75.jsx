var AdminCertifications = React.createClass({
  certificationRows() {
    var row
    var that = this
    var certification_row = this.props.certifications.map( function(certification) {
      var setUser
      that.props.users.map( function(user) {
        if (user.id == certification.user_id) {
          setUser = user
        }
      })
      var artist_payments = that.props.artist_payments || []
      var setPayments = []
      artist_payments.map( function(artist_payment) {
        if (certification.id == artist_payments.certification_id) {
          setPayments.push(artist_payment)
        }
      })

      row = <AdminCertificationTeaser
              key={certification.id}
              user={setUser}
              root={that.props.root}
              artist_payments={setPayments}
              certification={certification} />
      return row
    })
    return certification_row
  },
  render() {
    return (
      <div className='admin--certifications'>
      <div className='admin--certifications-table'>
      	{this.certificationRows()}
      </div>
    </div>
    );
  }
});

        // <h4 className='th'>
        //   <span className="fiscal-dates">Fiscal Dates</span>
        //   <span className="institution-name">Institution Name</span>
        //   <span className="operating">Operating Expenses</span>
        //   <span className="status">Application Status</span>
        // </h4>