var CertificationMenu = React.createClass({
  getInitialState() {
    return {
      navPosition: 0
    }
  },
  navigateMenu(e) {
    var item = $(e.target).closest('.certification-menu__item').data('id')
    this.props.navigateMenu(item)
    this.setState({navPosition: item})
  },
  isActiveItem(i) {
    if (this.state.navPosition == i) {
      return true
    }
  },
  hasCheck(item) {
    if (item != 'guidelines' && item != 'fee-schedule') {
      return <i className="fa fa-check" />
    } else {
      return false
    }
  },
  getItemProgress(item) {
    var progress = this.props.getProgress
    if (this.hasCheck(item)) {
      if (item == 'contact') {
        return progress.hasContact
      } else if (item == 'fiscal-details') {
        return progress.hasFiscalDetails
      } else if (item == 'fee-tracker') {
        return progress.hasPayments
      }
    }
  },
  printMenuItems() {
    var that = this
    var menu = this.props.menu.map(function(item, i) {
      var formattedItem = item.replace('-', ' ')
      return (
          <div className="certification-menu__item"
            name={item}
            data-id={i}
            key={i}
            data-active={that.isActiveItem(i)}
            data-progress={that.getItemProgress(item)}
            onClick={that.navigateMenu}>
            {that.hasCheck(item)}
            {formattedItem}
          </div>
        );
      })
    return menu
  },
  render() {
    return (
      <div className="certification-menu">
        {this.printMenuItems()}
      </div>
    );
  }
});