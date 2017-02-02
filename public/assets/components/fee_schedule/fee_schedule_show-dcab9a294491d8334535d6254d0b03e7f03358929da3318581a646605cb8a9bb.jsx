var FeeScheduleShow = React.createClass({
	getInitialState() {
		return {
      fee_categories: this.props.fee_categories,
      certification: this.props.certification,
      certifications: this.props.certifications,
      user: this.props.user
		}
	},
  handleInputChange(e) {
    var i = e.target.value
    debugger
    this.setState({certification: this.props.certifications[i]})
  },
  formatDates(certification) {
    var formatted_date
    if (moment(certification.fiscal_start).format('Y') == moment(certification.fiscal_end).format('Y') ) {
      formatted_date = moment(certification.fiscal_start).format('MMM D') + " - " + moment(certification.fiscal_end).format('MMM D, YYYY');
    } else {
      formatted_date = moment(certification.fiscal_start).format('MMM D, YYYY') + " - " + moment(certification.fiscal_end).format('MMM D, YYYY');
    }
    return formatted_date
  },
  getCertificationDates() {
    var that = this
    var date_options = this.props.certifications.map(function(certification, i) {
      var formatted_date = that.formatDates(certification)
      return (
        <option key={i} value={i}>
          {formatted_date}
        </option>
      )
    })
    var form = <div className="field-group">
            <select
              type='text'
              name='fee_category_id'
              className='form-control'
              value={this.optionState}
              onChange={this.handleInputChange}>
              {date_options}
            </select>
            <i className='fa fa-sort'></i>
            </div>
    return form
  },
	render() {
		return (
			<div className='fee-schedule'>
        <div className='fee-schedule__intro'>
  				<h1 className='fee-schedule__title'><span>Fee Schedule</span><span className='subtitle'>{moment(this.state.certification.fiscal_end).format(': Y')}</span></h1>
          <div className='fee-schedule__certification-date'>{this.getCertificationDates()}</div>
				</div>
        <FeeSchedule certification={this.state.certification} fee_categories={this.props.fee_categories} />
			</div>
		)
	}
})