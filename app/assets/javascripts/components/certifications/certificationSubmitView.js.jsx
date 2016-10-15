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
    if (moment(this.props.user.fiscal_start).format('Y') == moment(this.props.user.fiscal_end).format('Y')) {
      var format_start = moment(this.props.user.fiscal_start).format('MMM D')
    } else {
      var format_start = moment(this.props.user.fiscal_start).format('MMM D, Y')
    }
    var fiscal_dates_show = <span>{format_start} - {moment(this.props.user.fiscal_end).format('MMM D, Y')}</span>
    var formatted_operating = '$' + Number(this.props.certification.operating_expenses).toLocaleString()
    return (
      <div id="review" className="certification col-xs-12">
        <h1><span>Review</span></h1>
        <div className="section intro">
          <h3>{this.props.user.institution_name}</h3>
          <h4>Application for W.A.G.E. Certification</h4>
          <h4>Fiscal Year: {fiscal_dates_show}</h4>
        </div>
        <div className="section contact clearfix">
          <h3>Contact Information</h3>
          <div className="col col-lg-6">
            <p>{this.props.user.rep_name}, {this.props.user.rep_title}</p>
            <p>{this.props.user.email}</p>
            <p>{this.props.user.phone}</p>
          </div>
          <div className="col col-lg-6">
            <p>{this.props.user.address_st1}, {this.props.user.address_st2}</p>
            <p>{this.props.user.address_city}, {this.props.user.address_state} {this.props.user.address_zip}</p>
            <p><a href={this.props.user.website} target="_blank">{this.props.user.website}</a></p>
          </div>
        </div>
        <div className="section financials clearfix">
          <h3>Financial Details</h3>
          <p><strong>Operating Expenses:</strong> {formatted_operating}</p>
          <p><strong>Operating Budget:</strong> <a href={this.props.certification.file_budget} target="_blank">{this.props.certification.file_budget}</a></p>
          <p><strong>Form 990:</strong> <a href={this.props.certification.file_990} target="_blank">{this.props.certification.file_990}</a></p>
          <p><strong>501c3:</strong> <a href={this.props.user.file_501c3} target="_blank">{this.props.user.file_501c3}</a></p>
        </div>
        <div className="section statement clearfix">
          <h3>Statement of Intent</h3>
          <p>{this.state.user.statement}</p>
        </div>
        <button className="btn btn-lg save" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
});
