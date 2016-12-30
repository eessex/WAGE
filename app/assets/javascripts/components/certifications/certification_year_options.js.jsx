var CertificationYearOptions = React.createClass({
  handleNewCertification(e) {
    var year = $(e.target).parent().find('select').val()
    var newCertification = this.props.certification
    var fiscal_start = this.props.user.fiscal_start
    var fiscal_end = this.props.user.fiscal_end
    if (moment(fiscal_end).format('Y') != year) {
      if (moment(fiscal_start).format('Y') == moment(fiscal_end).format('Y')) {
        newCertification.fiscal_start = fiscal_start.replace(moment(fiscal_start).format('Y'), e.target.value)
      }
    } else {
      newCertification.fiscal_start = fiscal_start
      newCertification.fiscal_end = fiscal_end
    }
    if (this.props.certification.id) {
      this.props.handleCertificationUpdate(newCertification)
      this.props.toggleEdit()
    } else {
      this.props.handleAddCertification(newCertification)
      this.props.toggleEdit()
    }
  },
  getUnique(value, index, self) {
    return self.indexOf(value) === index;
  },
  setYears() {
    var today = new Date
    var years = []
    var plusYear = ""
    var currentYear = ""
    // current year is valid
    if ( (moment(this.props.user.fiscal_start) < moment(today).add(90, 'days')) && (moment(today) < moment(this.props.user.fiscal_end)) ) {
      currentYear = moment(this.props.user.fiscal_end).format('Y')
      years.push( parseInt(currentYear) )
    }
    // if upcoming year is valid
    if (moment(this.props.user.fiscal_start).add(1, 'year') < moment(today).add(90, 'days')) {
      if (moment(this.props.user.fiscal_start).add(2, 'years').subtract(1,'days').format('Y') != currentYear) {
        plusYear = moment(this.props.user.fiscal_start).add(2, 'years').subtract(1,'days').format('Y')
        years.push( parseInt(plusYear) )
      }
    }
    var unique = years.filter( this.getUnique )
    var options = unique.map( function(year) {
     return (
        <option key={year} value={year}>
          {year}
        </option>
      )
    })
    return options
  },
  render() {
    return (
      <div>
        <h4>Start my certification in: </h4>
        <div className="form certification-year">
        <h4><select className="form-control">
          {this.setYears()}
        </select></h4>
        <button className="btn btn-lg" onClick={this.handleNewCertification}>Next</button>
        </div>
        <h4>You can apply for certification in additional years once your first application is complete.</h4>
      </div>
    )
  }
})
