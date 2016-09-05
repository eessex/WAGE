var FeeCategories = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      fee_category: {
        name: '',
        email: '',
        manager: false
      },
      errors: {}
    }
  },

  handleNameChange(e) {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.name = e.target.value
    this.setState({fee_category: newFeeCategory});
  },

  handleEmailChange(e) {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.email = e.target.value
    this.setState({fee_category: newFeeCategory});
  },

  handleManagerChange(e) {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.manager = e.target.value
    this.setState({fee_category: newFeeCategory});
  },

  handleHireFeeCategory() {
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
            email: '',
            manager: false
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleFireFeeCategory(fee_category) {
    var fee_categoryList = this.state.fee_categories.filter(function(item) {
      return fee_category.id !== item.id;
    });
    this.setState({fee_categories: fee_categoryList});
  },

  render() {
    var that = this;
    fee_categories = this.state.fee_categories.map( function(fee_category) {
      return (
        <FeeCategory fee_category={fee_category} key={fee_category.id} onFireFeeCategory={that.handleFireFeeCategory} />
      );
    });
    return (
      <div>
        <h1>FeeCategories</h1>
        <div id="fee_categories">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {fee_categories}
              <tr>
                <td>
                  <input type="text" value={this.state.fee_category.name} onChange={this.handleNameChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input value={this.state.fee_category.email} type="text" onChange={this.handleEmailChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.email}</span>
                </td>
                <td><input value={this.state.fee_category.manager} type="checkbox" onChange={this.handleManagerChange} /></td>
                <td><button onClick={this.handleHireFeeCategory}>Hire</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
