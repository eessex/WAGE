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
  render() {
    var fee_categories = this.state.fee_categories.map( function(fee_category, i) {
    var floor_fee = Number(fee_category.floor_fee).toLocaleString()
    var min_fee = Number(this.state.certification.operating_expenses * Number(fee_category.over500K)).toLocaleString()
    var subtitle = fee_category.fee_subtitle
      if (min_fee > floor_fee) {
        var format_fee = <span className="wide"><span className="floor">${floor_fee}</span><span>${min_fee} {subtitle}</span></span>
      } else {
        var format_fee = <span><span>${floor_fee}{subtitle}</span></span>
      }
      return (
        <div key={fee_category.id} className="fee-category">
          <h4>
            <span className="title">{fee_category.name}</span>
            {format_fee}
          </h4>
          <div className="description">{fee_category.description}</div>
        </div>
      )
    }, this);
    var operating_expenses
    if (this.state.certification.operating_expenses) {
      operating_expenses = 'TAOE: $' + Number(this.state.certification.operating_expenses).toLocaleString()
      if (this.state.certification.operating_expenses <= 500000) {
        var fee_title = <span>Floor Wage</span>
      } else{
        var fee_title = <span className="wide"><span className="floor">Floor Wage</span><span>Minimum Wage</span></span>
      }
    }
    return (
      <div id="fee-schedule">
      <div id="schedule-table">
        <div>
          <div className="fee-category header">
            <h4>
              <div className="title">
              <span>Fee Category</span>
              <span>{operating_expenses}</span></div>
              {fee_title}
            </h4>
          </div>
          {fee_categories}
        </div>
      </div>
    </div>
    )
  }
});
