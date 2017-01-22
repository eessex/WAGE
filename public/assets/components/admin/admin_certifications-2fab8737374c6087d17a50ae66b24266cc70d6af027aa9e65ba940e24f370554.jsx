var AdminCertifications = React.createClass({

	certificationRow() {
		var row = <div key={this.props.certification.id} data-certification={this.props.certification.id}>
				{moment(this.props.certification.fiscal_end).format('Y')}
			</div>
		return row
	},
  certificationsRow() {
    var row
    var that = this
    var user_row = this.props.certifications.map( function(certification) {
        row = that.certificationRow()
      return row
    })
    return user_row
  },
	render() {
		return (
			<div>AdminCertifications</div>
		);
	}
});