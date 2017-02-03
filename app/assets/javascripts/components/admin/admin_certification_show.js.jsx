var AdminCertificationShow = React.createClass({
  getInitialState() {
    return {
    	statusOptions: ['In Progress', 'Pending Admin Review', 'W.A.G.E. Certified Pending', 'Payments Pending Review', 'W.A.G.E. Certified', 'Requires Updates'],
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments || []
    }
  },
  showFile(type, model, title) {
    var file
    if (this.props[model][type] && this.props[model][type].length > 2) {
      if (this.props.certification.status < 1 || (this.props.certification.status == 1 && type != 'statement' && type != 'file_contract')) {
        file = <a href={this.props[model][type]} target="_blank"><i className="fa fa-file" aria-hidden="true"></i> {title}</a>
      }
    }
    return file
  },
  userContact() {
    var userContact = <div className="section contact clearfix">
        	<ReviewUserContact user={this.props.user} />
        </div>
    return userContact
  },
  formattedOperating() {
    var formatted_operating = '$' + Number(this.props.certification.operating_expenses).toLocaleString()
    return formatted_operating
  },
  institutionInfo() {
    var file_990
    var label_990
    if (this.props.yearStatus == 'past') {
      label_990 = <span className="upload disabled"><i className="fa fa-file"></i> Form 990 <span className="suggested">* If Available</span></span>
      file_990 = <h5>{this.props.certification.file_990 ? this.showFile('file_990', 'certification', 'Form 990') : label_990}</h5>
    }
    var file_budget = <span className='upload disabled'><i className='fa fa-file'></i> Operating Budget <span className='req'>*</span></span>
    return ( <div className="section certification-year clearfix">
        <h5>Fiscal Year: {this.getFiscalDates()}</h5>
        <h5>Total Annual Operating Expenses: {this.props.certification.operating_expenses ? this.formattedOperating() : this.formattedOperating()}</h5>
        <h5>{this.props.certification.file_budget ? this.showFile('file_budget', 'certification', "Operating Budget") : file_budget}</h5>
        {file_990}
      </div>
    )
  },
  showMaterials() {
    var file_contract = <span className='upload disabled'><i className='fa fa-file'></i> Sample Contracts <span className='req'>*</span></span>
    var file_990 = <span className='upload disabled'><i className='fa fa-file'></i> Form 990 <span className='suggested'>* If Available</span></span>
    var file_501c3 = <span className='upload disabled'><i className='fa fa-file'></i> 501c3 <span className='req'>*</span></span>
    var statement = <span className='upload disabled'><i className='fa fa-file'></i> Statement of Intent <span className='req'>*</span></span>
    return (
      <div className="section financials clearfix">
        <h5>{this.props.user.file_501c3 ? this.showFile('file_501c3', 'user', "501c3") : file_501c3}</h5>
        <h5>{this.props.certification.file_990 ? this.showFile('file_990', 'certification', "Form 990") : file_990}</h5>
        <h5>{this.props.user.file_contract ? this.showFile('file_contract', 'user', "Sample Contracts") : file_contract}</h5>
        <h5>{this.props.user.statement ? this.showFile('statement', 'user', "Statement of Intent") : statement}</h5>
      </div>
    )
  },
  getFiscalDates() {
    var fiscalDates
    if (this.props.user.fiscal_start) {
     fiscalDates = moment(this.props.user.fiscal_start).format('MMM D Y') + " - " + moment(this.props.user.fiscal_end).format('MMM D Y')
    }
    return fiscalDates
  },
  paymentsTable() {
    var payments
    if (this.props.artist_payments && this.props.artist_payments.length > 0) {
      payments = <div className="section artist-payments clearfix">
        <h3 className="section artist-payments__title">Artist Payments</h3>
        <ArtistPaymentsTable
          artist_payments={this.props.artist_payments}
          sortRowsBy={this.props.sortRowsBy}
          isEdit="false"
          fee_categories={this.props.fee_categories} />
        </div>
    }
    return payments
  },
  handleCertificationUpdate(certification) {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: certification,
      },
      url: '/certifications/' + certification.id + '.json',
      success: function(res) {
        that.setState({
          certification: res
        })
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleInputChange(e) {
    var changed = $(e.target).data('id')
    var newCertification = this.state.certification
    newCertification[changed] = e.target.value
    this.handleCertificationUpdate(newCertification)
  },
	setStatus() {
		var that = this
		var options = this.state.statusOptions.map( function(status, i) {
			if ((i == 3 && that.props.artist_payments.length == 0 ) ) {
				return false
			} else {
		    return (
		      <option key={i} value={i}>
		        {status}
		      </option>
		    )
		  }
    });
    var disabled
    if (this.state.certification.status == 0) {
    	disabled = true
    }
    return (
    	<select
    		value={this.state.certification.status}
    		disabled={disabled}
    		data-id='status'
    		onChange={this.handleInputChange}
    		className='form-control'>
    		{options}
    	</select>
    )
	},
  render() {
    return (
      <div className="certification certification-review">
        <div className="certification-review__body">
          <div className="certification-review__header">
	          <h3 className="title">
              <a href={this.props.root + '/users/' + this.props.user.id}>
                {this.props.user.institution_name}
              </a>
            </h3>
	          <div className="status">{this.setStatus()}</div>
          </div>
          {this.userContact()}
          {this.institutionInfo()}
          {this.showMaterials()}
        </div>
        <div className="certification-review__payments">
          {this.paymentsTable()}
        </div>
      </div>
    );
  }
});


