var FeeCategoryShow = React.createClass({
	getInitialState() {
	  return {
	    fee_category: this.props.fee_category,
	    editMode: true,
	    errors: {}
	  }
  },
  handleInputChange(e) {
    var changed = $(e.target).data('id')
    var newFeeCategory = this.state.fee_category
    newFeeCategory[changed] = e.target.value
    this.setState({fee_category: newFeeCategory});
  },
  handleFeeCategoryUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        fee_category: that.state.fee_category,
      },
      url: '/fee_categories/' + that.state.fee_category.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          fee_category: res,
          editMode: false
        });
        window.location = that.props.root + '/#fee-categories'
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleFeeCategoryDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/fee_categories/' + that.state.fee_category.id + '.json',
      success: function(res) {
      	window.location = that.props.root + '/#fee-categories'
        that.props.onDeleteFeeCategory(that.state.fee_category);
      }
    })
  },

  render() {
      markup = (
        <div className='fee-category--edit'>
        	<div className="header">
        		<h3><span>Edit: {this.props.fee_category.name}</span></h3>
        	</div>
          <div className='form-group' data-id='name'>
          	<h5>Name</h5>
            <input
              className="form-control"
              type="text"
              data-id='name'
              value={this.state.fee_category.name}
              onChange={this.handleInputChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </div>
          <div className='inline-form-group'>
	          <div className='form-group' data-id='floor_fee'>
	            <h5>Floor Fee</h5>
	            <input
	              type="text"
	              className="form-control"
	              data-id='floor_fee'
	              value={this.state.fee_category.floor_fee}
	              onChange={this.handleInputChange} />
	            <span style={{color: 'red'}}>{this.state.errors.floor_fee}</span>
	          </div>
	          <div className='form-group' data-id='over500K'>
	          	<h5>% TAOE</h5>
	            <input
	              type="text"
	              className="form-control"
	              data-id='over500K'
	              value={this.state.fee_category.over500K}
	              onChange={this.handleInputChange} />
	            <span style={{color: 'red'}}>{this.state.errors.over500K}</span>
	          </div>
          </div>
          <div className='form-group' data-id='description'>
          	<h5>Description</h5>
            <textarea
              className="form-control"
              data-id='description'
              value={this.state.fee_category.description}
              onChange={this.handleInputChange} />
            <span style={{color: 'red'}}>{this.state.errors.description}</span>
          </div>
          <div className='actions' data-id='save'>
            <button className='btn btn-lg btn-save' onClick={this.handleFeeCategoryUpdate}>Save</button>
            <button className='btn btn-dgr btn-sm' onClick={this.handleFeeCategoryDelete} style={{color: 'red'}}>Delete</button>
          </div>
        </div>
      )
    return markup;
   }
});
