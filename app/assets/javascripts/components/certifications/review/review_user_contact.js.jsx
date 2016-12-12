var ReviewUserContact = React.createClass({
  render() {
    var displayStreet = <span>{this.props.user.address_st2 ? ", " + this.props.user.address_st2 : ""}</span>;
    return (
      <div id="review--user-contact" class="review--user-contact">
        <div className="col col-lg-6">
          <h5>{this.props.user.rep_name}, {this.props.user.rep_title}</h5>
          <h5>{this.props.user.email}</h5>
          <h5>{this.props.user.phone}</h5>
        </div>
        <div className="col col-lg-6">
          <h5>{this.props.user.address_st1}{displayStreet}</h5>
          <h5>{this.props.user.address_city}, {this.props.user.address_state} {this.props.user.address_zip}</h5>
          <h5><a href={this.props.user.website} target="_blank">{this.props.user.website}</a></h5>
        </div>
      </div>
    )
  }
})
