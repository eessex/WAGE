var FeeCategoryTeaser = React.createClass({
  getInitialState() {
    return {
      fee_category: this.props.fee_category
    }
  },

  render() {
    return (
        <a href={this.props.root + "/fee_categories/" + this.props.fee_category.id } key={this.props.fee_category.id} data-category={this.props.fee_category.id} className={"category-container category-container--" + this.props.fee_category.id + " "}>
          <h5 className='category-container__title dropdown'>
            <div className="header">
              <span className='name'>
                {this.state.fee_category.name}
              </span>
              <span className='floor_fee'>
                ${Number(this.state.fee_category.floor_fee).toLocaleString() + this.state.fee_category.fee_subtitle}
              </span>
              <span>
                {this.state.fee_category.over500K}
              </span>
              <span className='actions' data-id='edit'>
                <button className='btn'>Edit</button>
              </span>
            </div>
            <div className='category-container__content' data-id='description'>
              {this.state.fee_category.description}
            </div>
          </h5>
        </a>
    );
  }
});