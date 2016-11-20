var FeeSchedule = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      certification: null
    }
  },
  componentWillMount() {
    if (this.props.certification) {
      this.setState({certification: this.props.certification})
    } else {
      this.setState({certification: { operating_expenses: 500000 }})
    }
  },
  feeStatus() {
    var feeStatus
    if (this.props.certification.operating_expenses >= 15000000) {
      feeStatus = "max"
    } else if (this.props.certification.operating_expenses >= 5000000) {
      feeStatus = "over5m"
    } else if (this.props.certification.operating_expenses > 500000) {
      feeStatus = "min"
    } else {
      feeStatus = "floor"
    }
    return feeStatus
  },
  feeHeader() {
    var status = this.feeStatus()
    var fee_header
    if (status == "floor") {
      fee_header = <span>Floor Wage</span>
    } else if (status == "min") {
      fee_header = <span className="wide"><span className="left">Floor Wage</span><span>Minimum Wage</span></span>
    } else if (status == "over5m") {
      fee_header = <span className="wide"><span className="left">Minimum Wage</span><span>Recommended</span></span>
    }
    return fee_header
  },
  FeeCategoryRows() {
    var fee_categories = this.state.fee_categories.map( function(fee_category, i) {
    var status = this.feeStatus()
    var subtitle = fee_category.fee_subtitle
    var floor_fee = Number(fee_category.floor_fee).toLocaleString()
    var min_fee = Number(this.state.certification.operating_expenses * Number(fee_category.over500K)).toLocaleString()
    var over5m = Number(5000000 * Number(fee_category.over500K)).toLocaleString()
    var format_fee
    if (status == "floor") {
      format_fee = <span className="wide"><span>${floor_fee}{subtitle}</span></span>
    } else if (status == "min") {
      format_fee = <span className="wide"><span className="left">${floor_fee}</span><span className="right">${min_fee} {subtitle}</span></span>
    } else if (status == "over5m") {
      format_fee = <span className="wide"><span className="left">${over5m}</span><span className="right">${min_fee} {subtitle}</span></span>
    }
    return (
      <div key={fee_category.id} className="fee-category">
        <h5>
          <span className="title">{fee_category.name}</span>
          {format_fee}
        </h5>
        <div className="description">{fee_category.description}</div>
      </div>
      )
    }, this);
    return fee_categories
  },
  render() {
    return (
      <div id="fee-schedule">
      <div id="schedule-table">
        <div>
          <div className="fee-category header">
            <h5>
              <div className="title">
              <span>Fee Category</span>
              </div>
              {this.feeHeader()}
            </h5>
          </div>
          {this.FeeCategoryRows()}
        </div>
      </div>
    </div>
    )
  }
});
