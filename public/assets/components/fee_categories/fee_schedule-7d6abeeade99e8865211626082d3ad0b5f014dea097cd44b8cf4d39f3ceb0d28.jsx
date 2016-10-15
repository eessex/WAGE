var FeeSchedule = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      floor_categories: this.props.floor_categories
    }
  },
  componentDidMount() {
    if (this.props.certification.operating_expenses > 500000 && this.props.certification.operating_expenses < 15000000) {
      var get_fees = this.getMyFeeSchedule()
      var my_fees = this.setUpdatedFees(get_fees)
    } else {
      this.setState({fee_categories: this.props.fee_categories})
    }
  },
  getMyFeeSchedule() {
    var operating = this.props.certification.operating_expenses
    var me = [ operating * .002, //solo
               operating * .0012,
               operating * .001,
                operating * .0005,
                operating * .0003,
                operating * .0006,
                operating * .0012,
                operating * .0002,
                operating * .0002,
                operating * .0003,
                operating * .0005,
                50,
                .25,
                 20 ]
    return me
  },
  setUpdatedFees(fees) {
    var fees = fees
    var newFeeCategories = fees.map( function(fee, i) {
      var newCategory = this.state.fee_categories[i]
      newCategory.floor_fee = fee
      return newCategory
    }, this);
    debugger
    this.setState({fee_categories: newFeeCategories})
  },
  render() {
    var fee_categories = this.state.fee_categories.map( function(fee_category, i) {
      var format_fee = '$' + Number(fee_category.floor_fee).toLocaleString() + fee_category.fee_subtitle
        return (
          <div key={fee_category.id} className="fee-category">
            <h4>
              <span>{fee_category.name}</span>
              <span>{format_fee}</span>
            </h4>
            <div className="description">{fee_category.description}</div>
          </div>
        )
      }, this);
    return (
      <div id="fee-schedule">
        <h1><span>Fee Schedule: {moment(this.props.certification.fiscal_start).format('Y')}</span></h1>
        <h4 className="taoe">TAOE: ${Number(this.props.certification.operating_expenses).toLocaleString()}</h4>
        <div>
          <div className="fee-category header">
            <h4>
              <span>Fee Category</span>
              <span>Minimum Fee</span>
            </h4>
          </div>
          {fee_categories}
        </div>
      </div>
    )
  }
});


var FeeCategoryRow = React.createClass({
  render() {
    return (
      <div>{this.props.fee_category.name}</div>
    )
  }
})
