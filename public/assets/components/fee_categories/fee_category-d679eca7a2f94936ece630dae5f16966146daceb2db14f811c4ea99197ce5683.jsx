var FeeCategories = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      fee_category: {
        name: '',
      },
      errors: {}
    }
  },

  handleNameChange(e) {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.name = e.target.value
    this.setState({fee_category: newFeeCategory});
  },

  handleFloorFeeChange(e) {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.floor_fee = e.target.value
    this.setState({fee_category: newFeeCategory});
  },

  handleDescriptionChange(e) {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.description = e.target.value
    this.setState({fee_category: newFeeCategory});
  },

  handleNewFeeCategory() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        fee_category: that.state.fee_category,
      },
      url: '/fee_categories.json',
      success: function(res) {
        var newFeeCategoryList = that.state.fee_categories;
        newFeeCategoryList.push(res);
        that.setState({
          fee_categories: newFeeCategoryList,
          fee_category: {
            name: '',
            floor_fee: '',
            description: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleDeleteFeeCategory(fee_category) {
    var fee_categoryList = this.state.fee_categories.filter(function(item) {
      return fee_category.id !== item.id;
    });
    this.setState({fee_categories: fee_categoryList});
  },

  render() {
    var that = this;
    fee_categories = this.state.fee_categories.map( function(fee_category) {
      return (
        <FeeCategory fee_category={fee_category} key={fee_category.id}  />
      );
    });
    return (
      <div>
        <div id="fee_categories" className='fee-categories'>
          <div className='fee-categories--table'>
            <div className='fee-categories--table__header'>
              <div className='item' data-id='name'>Name</div>
              <div className='item' data-id='floor_fee'>Floor Fee</div>
            </div>
            {fee_categories}
          </div>
        </div>
      </div>
    );
  }
});
// <div>
//               <div>
//                 <input type="text" className="form-control" value={this.state.fee_category.name} onChange={this.handleNameChange} />
//                 <span style={{color: 'red'}}>{this.state.errors.name}</span>
//               </div>
//               <div>
//                 <input className="form-control" value={this.state.fee_category.floor_fee} type="text" />
//                 <span style={{color: 'red'}}>{this.state.errors.floor_fee}</span>
//               </div>
//               <div><button onClick={this.handleAddFeeCategory}>Add</button></div>
//             </div>