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
        <tr>
          <td>
            <input
              type="text"
              value={this.state.fee_category.name}
              onChange={this.handleNameChange} />
            <span style={{color: 'red'}}>{this.state.errors.name}</span>
          </td>
          <td>
            <input
              type="text"
              value={this.state.fee_category.floor_fee}
              onChange={this.handleFloorFeeChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.floor_fee}</span>
          </td>
          <td>
            <textarea
              value={this.state.fee_category.description}
              onChange={this.handleDescriptionChange} />
            <br />
            <span style={{color: 'red'}}>{this.state.errors.description}</span>
          </td>
          <td>
            <button onClick={this.handleFeeCategoryUpdate}>Save</button>
            <button onClick={this.handleFeeCategoryDelete} style={{color: 'red'}}>Delete</button>
          </td>
        </tr>
      );
    } else {
      markup = (
        <tr>
          <td>{this.state.fee_category.name}</td>
          <td>{this.state.fee_category.floor_fee}</td>
          <td>{this.state.fee_category.description}</td>
          <td>
            <button onClick={this.setEditMode}>Edit</button>
          </td>
        </tr>
      );
    }
    return markup;
  }
});
