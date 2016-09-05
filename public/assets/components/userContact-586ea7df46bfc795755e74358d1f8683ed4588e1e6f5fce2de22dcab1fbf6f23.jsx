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
      editMode: this.isNew(),
      errors: {}
    }
  },
  setEditMode() {
    this.setState({editMode: true});
  },
  isNew() {
    if (this.props.user.address_st1) {
      return false
    } else {
      return true
    }
  },

  handleRepNameChange(e) {
    var newUser = this.state.user
    newUser.rep_name = e.target.value
    this.setState({user: newUser});
  },

  handleRepTitleChange(e) {
    var newUser = this.state.user
    newUser.rep_title = e.target.value
    this.setState({user: newUser});
  },

  handleEmailChange(e) {
    var newUser = this.state.user
    newUser.email = e.target.value
    this.setState({user: newUser});
  },
  handlePhoneChange(e) {
    var newUser = this.state.user
    newUser.phone = e.target.value
    this.setState({user: newUser});
  },
  handleWebsiteChange(e) {
    var newUser = this.state.user
    newUser.website = e.target.value
    this.setState({user: newUser});
  },
  handleAd1Change(e) {
    var newUser = this.state.user
    newUser.address_st1 = e.target.value
    this.setState({user: newUser});
  },
  handleAd2Change(e) {
    var newUser = this.state.user
    newUser.address_st2 = e.target.value
    this.setState({user: newUser});
  },
  handleAdCityChange(e) {
    var newUser = this.state.user
    newUser.address_city = e.target.value
    this.setState({user: newUser});
  },
  handleAdStateChange(e) {
    var newUser = this.state.user
    newUser.address_state = e.target.value
    this.setState({user: newUser});
  },
  handleAdZipChange(e) {
    var newUser = this.state.user
    newUser.address_zip = e.target.value
    this.setState({user: newUser});
  },
  toggleStatus: function () {
    var newUser = this.state.user
    newUser.status = !this.state.user.status
    this.handleUserUpdate();
  },
  handleUserUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        user: that.state.user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          // user: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleUserDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/users/' + that.state.user.id + '.json',
      success: function(res) {
        that.props.onDeleteUser(that.state.user);
      }
    })
  },

  render() {
    var options = STATES.map(function(value) {
      return <option value={value}>{value}</option>
    });
    var displayStreet = <span>{this.state.user.address_st2 ? ", " + this.state.user.address_st2 : ""}</span>;

    var address_form = <div className="form">
              <div>
                <div className="field-group col-lg-8">
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="address_st1"
                    className="form-control"
                    value={this.state.user.address_st1}
                    onChange={this.handleAd1Change} />
                  <span style={{color: 'red'}}>{this.state.errors.address_st1}</span>
                </div>
                <div className="field-group col-lg-4">
                  <input
                    type="text"
                    name="address_st2"
                    placeholder="APT/Floor"
                    className="form-control"
                    value={this.state.user.address_st2}
                    onChange={this.handleAd2Change} />
                  <span style={{color: 'red'}}>{this.state.errors.address_st2}</span>
                </div>
              </div>
              <div>
                <div className="field-group col-lg-6">
                  <input
                    type="text"
                    name="address_city"
                    placeholder="City"
                    className="form-control"
                    value={this.state.user.address_city}
                    onChange={this.handleCityChange} />
                  <span style={{color: 'red'}}>{this.state.errors.address_city}</span>
                </div>
                <div className="field-group col-lg-2">
                  <select
                    className="form-control"
                    name="address_state"
                    value={this.state.user.address_state}
                    onChange={this.handleAdStateChange} >
                    {options}
                  </select>
                </div>
                <div className="field-group col-lg-4">
                  <input
                    type="text"
                    name="address_zip"
                    placeholder="Zip"
                    className="form-control"
                    value={this.state.user.address_zip}
                    onChange={this.handleAdZipChange} />
                  <span style={{color: 'red'}}>{this.state.errors.address_zip}</span>
                </div>
              </div>
            </div>
    var contact_form = <div className="form form-inline">
      <div className="field-group">
      <label>Name</label>
        <input
          type="text"
          placeholder="First Last"
          name="rep_name"
          className="form-control"
          value={this.state.user.rep_name}
          onChange={this.handleRepNameChange} />
        <span style={{color: 'red'}}>{this.state.errors.rep_name}</span>
      </div>
      <div className="field-group">
      <label>Title</label>
        <input
          type="text"
          placeholder="Development Director"
          name="rep_title"
          className="form-control"
          value={this.state.user.rep_title}
          onChange={this.handleRepTitleChange} />
        <span style={{color: 'red'}}>{this.state.errors.rep_name}</span>
      </div>
      <div className="field-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          className="form-control"
          value={this.state.user.email}
          onChange={this.handleEmailChange} />
        <span style={{color: 'red'}}>{this.state.errors.email}</span>
      </div>
      <div className="field-group">
        <label>Phone</label>
        <input
          type="phone"
          placeholder="phone"
          name="phone"
          className="form-control"
          value={this.state.user.phone}
          onChange={this.handlePhoneChange} />
        <span style={{color: 'red'}}>{this.state.errors.phone}</span>
      </div>
      <div className="field-group">
        <label>Website</label>
        <input
          type="url"
          placeholder="http://example.org"
          name="website"
          className="form-control"
          value={this.state.user.website}
          onChange={this.handleWebsiteChange} />
        <span style={{color: 'red'}}>{this.state.errors.website}</span>
      </div>
    </div>

    if ( this.state.editMode ) {
      markup = (
        <div id="contact" className="edit">
          <div className="actions rep col-sm-12 col-lg-2">
            <button className="btn" onClick={this.handleUserUpdate}>Save</button>
          </div>
          <div className="rep col-sm-12 col-lg-5">
            <div className="header">
              <h4>Account Administrator</h4>
            </div>
            {contact_form}
          </div>
          <div className="address col-sm-12 col-lg-5">
            <div className="header">
              <h4>Mailing Address</h4>
            </div>
            {address_form}
          </div>
        </div>
      );
    } else {
      markup = (
        <div className="view">
          <div className="actions rep col-sm-12 col-lg-2">
            <button className="btn" onClick={this.setEditMode}>Edit</button>
          </div>
          <div className="rep col-sm-12 col-lg-5">
            <div className="header">
              <h4>Account Administrator</h4>
            </div>
            <p>{this.state.user.rep_name}</p>
            <p>{this.state.user.rep_title}</p>
            <p>{this.state.user.email}</p>
            <p>{this.state.user.phone}</p>
            <p>{this.state.user.website}</p>
          </div>
          <div className="address col-sm-12 col-lg-5">
            <div className="header">
              <h4>Mailing Address</h4>
            </div>
            <p>{this.state.user.address_st1}{displayStreet}</p>
            <p>{this.state.user.address_city}, {this.state.user.address_state} {this.state.user.address_zip}</p>
          </div>
        </div>
      );
    }
    return markup;
  }
});
