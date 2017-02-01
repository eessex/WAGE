var FeeCategory = React.createClass({
  getInitialState() {
    return {
      fee_category: this.props.fee_category,
      editMode: false,
      errors: {}
    }
  },

  setEditMode() {
    this.setState({editMode: true});
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

  toggleDescriptionStatus: function () {
    var newFeeCategory = this.state.fee_category
    newFeeCategory.description = !this.state.fee_category.description
    this.handleFeeCategoryUpdate();
  },
  handleInputChange(e) {
    var changed = $(e.target).data('id')
    var newFeeCategory = this.state.fee_category
    newFeeCategory[changed] = e.target.value
    this.handleFeeCategoryUpdate(newFeeCategory)
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
        that.props.onDeleteFeeCategory(that.state.fee_category);
      }
    })
  },

  render() {
    if ( this.state.editMode ) {
      markup = (
        <div className='fee-categories--table__row edit'>
          <div className='item' data-id='name'>
            <input
              className="form-control"
              type="text"
              value={this.state.fee_category.name}
              onChange={this.handleNameChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </div>
          <div className='item' data-id='floor_fee'>
            <input
              type="text"
              className="form-control"
              value={this.state.fee_category.floor_fee}
              onChange={this.handleFloorFeeChange} />
            <span style={{color: 'red'}}>{this.state.errors.floor_fee}</span>
          </div>
          <div className='item' data-id='over500K'>
            <input
              type="text"
              className="form-control"
              value={this.state.fee_category.over500K}
              onChange={this.handleInputChange} />
            <span style={{color: 'red'}}>{this.state.errors.over500K}</span>
          </div>
          <div className='item' data-id='description'>
            <textarea
              className="form-control"
              value={this.state.fee_category.description}
              onChange={this.handleDescriptionChange} />
            <span style={{color: 'red'}}>{this.state.errors.description}</span>
          </div>
          <div className='actions' data-id='save'>
            <button className='btn' onClick={this.handleFeeCategoryUpdate}>Save</button>
            <button className='btn btn-dgr' onClick={this.handleFeeCategoryDelete} style={{color: 'red'}}>Delete</button>
          </div>
        </div>
      );
    } else {
      markup = (
          <div className='fee-categories--table__row show'>
            <div className='header'>
              <div className='item' data-id='name'>
                {this.state.fee_category.name}
              </div>
              <div className='item' data-id='floor_fee'>
                {this.state.fee_category.floor_fee}
              </div>
              <div className='actions' data-id='edit'>
                <button className='btn' onClick={this.setEditMode}>Edit</button>
              </div>
            </div>
            <div className='content'>
              <div className='item' data-id='description'>
                {this.state.fee_category.description}
              </div>
            </div>
          </div>
      );
    }
    return markup;
  }
});
