var AdminMenu = React.createClass({
  getInitialState() {
    return {
      navPosition: this.props.navPosition || 0,
      root: this.props.path
    }
  },
  navigateMenu(e) {
    e.preventDefault()
    var item = $(e.target).closest('.admin-menu__item').data('id')
    this.props.navigateMenu(item)
    this.setState({navPosition: item})
  },
  isActiveItem(i) {
    if (this.props.navPosition && this.props.navPosition == i) {
      return true
    }
  },
  printMenuItems() {
    var that = this
    var menu = this.props.menu.map(function(item, i) {
    var formattedItem = item.replace('-', ' ')
      return (
          <a className="admin-menu__item"
            href={that.state.root + '/#' + item}
            name={item}
            data-id={i}
            key={i}
            data-active={that.isActiveItem(i)}
            onClick={that.navigateMenu}>
            {formattedItem}
          </a>
        );
      })
    return menu
  },
  render() {
    return (
      <div className="admin-menu">
        <div className="nav">
        	{this.printMenuItems()}
        </div>
        <div className="is-saved"><i className="fa fa-check"></i><span>Saved</span></div>
      </div>
    );
  }
});