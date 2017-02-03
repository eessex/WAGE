var FeeCategoryTable = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      errors: {}
    }
  },
  getCategories() {
    var that = this;
    fee_categories = this.props.fee_categories.map( function(fee_category) {
      return (
        <FeeCategoryTeaser
          fee_category={fee_category}
          root={that.props.root}
          key={fee_category.id}  />
      );
    });
    return fee_categories
  },
  render() {
    return (
      <div>
	      <div className='fee-categories--table'>
	        <h5 className='th'>
	          <span className='name'>Name</span>
	          <span className='floor'>Floor Fee</span>
            <span className='subtitle'>%TAOE</span>
            <span className='actions'></span>
	        </h5>
	        {this.getCategories()}
	      </div>
	    </div>
    );
  }
});