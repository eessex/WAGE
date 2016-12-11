var CertificationMenu = React.createClass({
  setContentState(e) {
    debugger
    this.props.setContentState(e)
  },
  getYearStatus() {
    var status = this.props.getYearStatus()
    return status
  },
  setMenuItems() {
    var MENU_FUTURE = ['guidelines', 'financials', 'artist_payments', 'review']
    var MENU_PROGRESS = ['guidelines', 'financials', 'artist_payments', 'review']
    var MENU_PAST = ['guidelines', 'financials', 'artist_payments', 'review']
    var MENU_APPROVED = ['guidelines', 'financials', 'artist_payments', 'review']
    var menu
    if (this.getYearStatus().future) {
      menu = MENU_FUTURE.map( function(item, i) {
        item
      });
    }
    return menu
  },
  render() {
    return (
      <h6 className="status">
        {this.setMenuItems()[0]}
      </h6>
    )
  }
})
