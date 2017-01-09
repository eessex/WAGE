var ReviewUserContact = React.createClass({
  render() {
    var rep_name = <span className='disabled'>Representative Name <span className='req'>*</span></span>
    var rep_title = <span className='disabled'>Representative Title <span className='req'>*</span></span>
    var email = <span className='disabled'>email <span className='req'>*</span></span>
    var phone = <span className='disabled'>Phone <span className='req'>*</span></span>

    var address_st1 = <span className='disabled'>Street Address <span className='req'>*</span></span>
    var displayStreet = <span>{this.props.user.address_st2 ? ", " + this.props.user.address_st2 : ""}</span>
    var address_city = <span className='disabled'>City <span className='req'>*</span></span>
    var address_state = <span className='disabled'>State <span className='req'>*</span></span>
    var address_zip = <span className='disabled'>Zip <span className='req'>*</span></span>

    var website
    if (!this.props.user.website) {
      website = <span className='disabled'>http://example.org <span className='req'>*</span></span>
    } else {
      website = <a href={this.props.user.website} target="_blank">{this.props.user.website}</a>
    }

    return (
      <div id="certification-review--user-contact" className="certification-review--user-contact">
        <div className="col col-lg-6">
          <h5>{this.props.user.rep_name ? this.props.user.rep_name : rep_name}, {this.props.user.rep_title ? this.props.user.rep_title : rep_title}</h5>
          <h5>{this.props.user.email ? this.props.user.email : email}</h5>
          <h5>{this.props.user.phone ? this.props.user.phone : phone}</h5>
        </div>
        <div className="col col-lg-6">
          <h5>{this.props.user.address_st1 ? this.props.user.address_st1 : address_st1}{displayStreet}</h5>
          <h5>{this.props.user.address_city ? this.props.user.address_city : address_city}, {this.props.user.address_state ? this.props.user.address_state : address_state} {this.props.user.address_zip ? this.props.user.address_zip : address_zip}</h5>
          <h5>{website}</h5>
        </div>
      </div>
    )
  }
})
