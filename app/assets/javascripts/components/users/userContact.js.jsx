var STATES = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

var UserContact = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      errors: {}
    }
  },
  componentDidMount() {
    this.findRequired()
  },
  handleInputChange(e) {
    var newUser = this.state.user
    newUser[e.target.name] = e.target.value
    this.setState({user: newUser})
    this.props.handleUserUpdate(newUser)
    this.fulfilsRequired(e)
  },
  fulfilsRequired(e) {
      if (e.target) {
        e = e.target
      }
      if ($(e).attr('name') == 'address_state' && this.props.user.address_state != "" && this.props.user.address_state != null) {
        $(e).siblings('.req').addClass('green')
      } else if ($(e).attr('name') == 'phone') {
        if ( $(e).attr('value').match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) || $(e).val().match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) ) {
          $(e).siblings('.req').addClass('green')
        } else {
          $(e).siblings('.req').removeClass('green')
        }
      } else if ($(e).attr('name') == 'address_zip') {
        if ($(e).val().length == 5) {
          $(e).siblings('.req').addClass('green')
        } else {
          $(e).siblings('.req').removeClass('green')
        }
      } else if ($(e).val() && $(e).attr('name') != 'phone') {
        if ($(e).val().length > 3) {
          $(e).siblings('.req').addClass('green')
        } else {
          $(e).siblings('.req').removeClass('green')
        }
      }
  },
  findRequired() {
    var required = $('body input.required, body select.required')
    var that = this
    required.each( function(i, input) {
      that.fulfilsRequired(input)
    })
  },
  contactForm() {
    var contactForm =
    <div className="form">
      <div className="field-group">
        <h4 className="col col-xs-3">Your Name</h4>
        <div className="col col-xs-9">
          <input
            type="text"
            placeholder="First Last"
            name="rep_name"
            className="form-control required"
            value={this.props.user.rep_name}
            onChange={this.handleInputChange} />
          <span className="req">*</span>
          <span style={{color: 'red'}}>{this.props.errors.rep_name}</span>
        </div>
      </div>
      <div className="field-group">
        <h4 className="col col-xs-3">Your Title</h4>
        <div className="col col-xs-9">
          <input
            type="text"
            placeholder="Development Director"
            name="rep_title"
            className="form-control required"
            value={this.state.user.rep_title}
            onChange={this.handleInputChange} />
          <span className="req">*</span>
          <span style={{color: 'red'}}>{this.props.errors.rep_name}</span>
        </div>
      </div>
      <div className="field-group">
        <h4 className="col col-xs-3">Phone</h4>
        <div className="col col-xs-9 validated">
          <input
            type="phone"
            placeholder="phone"
            name="phone"
            className="form-control required"
            value={this.state.user.phone}
            onChange={this.handleInputChange} />
          <span className="req">*</span>
          <span className="error">{this.props.errors.phone}</span>
        </div>
      </div>
      <div className="field-group">
        <h4 className="col col-xs-3">Website</h4>
        <div className="col col-xs-9 validated">
          <input
            type="url"
            placeholder="http://example.org"
            name="website"
            className="form-control required"
            value={this.state.user.website}
            onChange={this.handleInputChange} />
          <span className="req">*</span>
          <span className="error">{this.props.errors.website}</span>
        </div>
      </div>
    </div>;
    return contactForm
  },
  addressForm() {
    var options = STATES.map(function(value, i) {
      return <option key={i} value={value}>{value}</option>
    });
    var addressForm = <div key="contact">
      <div className="form">
        <h4 className="col col-xs-12">Mailing Address</h4>
        <div className="field-group">
          <div className="col col-sm-8">
            <input
              type="text"
              placeholder="Street Address"
              name="address_st1"
              className="form-control required"
              value={this.state.user.address_st1}
              onChange={this.handleInputChange} />
            <span className="req">*</span>
            <span style={{color: 'red'}}>{this.props.errors.address_st1}</span>
          </div>
          <div className="col-sm-4 col">
            <input
              type="text"
              name="address_st2"
              placeholder="APT/Floor"
              className="form-control"
              value={this.state.user.address_st2}
              onChange={this.handleInputChange} />
            <span style={{color: 'red'}}>{this.props.errors.address_st2}</span>
          </div>
        </div>
        <div className="field-group">
          <div className="col col-sm-6">
            <input
              type="text"
              name="address_city"
              placeholder="City"
              className="form-control required"
              value={this.state.user.address_city}
              onChange={this.handleInputChange} />
            <span className="req">*</span>
            <span style={{color: 'red'}}>{this.props.errors.address_city}</span>
          </div>
          <div className="col col-sm-2">
            <select
              className="form-control required"
              name="address_state"
              value={this.state.user.address_state}
              onChange={this.handleInputChange} >
              {options}
            </select>
            <span className="req">* &nbsp;</span>
          </div>
          <div className="col-sm-4 col validated">
            <input
              type="text"
              name="address_zip"
              placeholder="Zip"
              className="form-control required"
              value={this.state.user.address_zip}
              onChange={this.handleInputChange} />
              <span className="req">*</span>
            <span className="error">{this.props.errors.address_zip}</span>
          </div>
        </div>
      </div>
    </div>;
    return addressForm;
  },
  render() {
    return (
      <div id="contact" className="contact">
        {this.contactForm()}
        {this.addressForm()}
      </div>
    );
  }
});
