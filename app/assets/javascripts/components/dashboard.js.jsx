var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      certification: this.props.certification,
      fee_categories: this.props.fee_categories,
      artist_payments: this.props.artist_payments,
      user: this.props.user,
      sortBy: 'date',
      sortDir: 'ASC',
      errors: {}
    }
  },
  componentDidMount() {
    this.setState({artist_payments: this.setPayments(this.state.certification)})
    $('.navbar-fixed-top').css('border-bottom', '2px solid')
    $('.dashboard .collapse .collapse__title').click(function(e) {
      $('.container').removeClass('active')
      var active = $(e.target).closest('.collapse').addClass('active')
      $('.container:not(.active)').find('.collapse__content').slideUp()
      $('.container').find('.collapse__title .fa').addClass('fa-plus').removeClass('fa-minus')
      if ($(active).find('.collapse__content').css('display') == 'block') {
        $(active).find('.collapse__content').slideUp()
        $(active).find('.collapse__title .fa').addClass('fa-plus').removeClass('fa-minus')
        $(active).removeClass('active')
      } else {
        $(active).find('.collapse__content').slideDown()
        $(active).find('.collapse__title .fa').removeClass('fa-plus').addClass('fa-minus')
      }
    })
  },
  sortRowsBy(e) {
    var sortDir = this.state.sortDir;
    var sortBy = $(e.target).attr('name') || $(e.target).parent().attr('name')
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir == 'ASC' ? 'DESC' : 'ASC';
    } else {
     sortDir = 'ASC';
    }
    var artist_payments = this.state.artist_payments.slice();
    artist_payments.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }
      if (sortDir === 'DESC') {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });
    this.setState({sortBy, sortDir});
    this.setState({artist_payments: artist_payments});
    $('th').removeClass('active')
    if ($(e.target).attr('name')) {
      $(e.target).addClass('active').toggleClass('ASC')
    } else {
      $(e.target).parent().addClass('active').toggleClass('ASC')
    }
  },
  handleInputChange(e) {
    var i = e.target.value
    this.setState({certification: this.props.certifications[i]})
    this.setState({artist_payments: this.setPayments(this.props.certifications[i])})
  },
  setPayments(certification) {
    var payments = []
    this.props.artist_payments.map( function(artist_payment) {
      if (artist_payment.certification_id == certification.id) {
        payments.push(artist_payment)
      }
    })
    return payments
  },
  getCertificationDates() {
    var that = this
    var date_options = this.props.certifications.map(function(certification, i) {
      var formatted_date = that.formatDates(certification)
      return (
        <option key={i} value={i}>
          {formatted_date}
        </option>
      )
    })
    var form = <div className="field-group">
            <select
              type='text'
              name='fee_category_id'
              className='form-control'
              value={this.optionState}
              onChange={this.handleInputChange}>
              {date_options}
            </select>
            <i className='fa fa-sort'></i>
            </div>
    return form
  },
  handleUserUpdate(user) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      data: {
        user: user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({
          errors: {}
        })
      },
      error: function(res) {
        that.setState({
          errors: res.responseJSON.errors
        });
      }
    });
  },
  handleCertificationUpdate(certification) {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: certification,
      },
      url: '/certifications/' + certification.id + '.json',
      success: function(res) {
        if (res.notice) {
          $('main').append('<div class="submit notice"><p>' + res.notice + '</p></div>')
          that.setState({
            certification: certification,
            canSubmit: that.canSubmit(),
            hasFiscalDetails: that.hasFiscalDetails(),
            hasPayments: that.hasPayments(),
            hasContact: that.hasContact(),
            hasMaterials: that.hasMaterials()
          })
          setTimeout(function () {
            window.location = that.props.path
          },2000);
        } else {
          that.setState({
            certification: certification,
            canSubmit: that.canSubmit(),
            hasFiscalDetails: that.hasFiscalDetails(),
            hasPayments: that.hasPayments(),
            hasContact: that.hasContact(),
            hasMaterials: that.hasMaterials()
          })
        }
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleAddArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments
    artist_payments.push(artist_payment)
    this.setState({artist_payments: artist_payments})
  },
  handleDeleteArtistPayment(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    this.setState({artist_payments: artist_payments})
  },
  handleArtistPaymentUpdate(artist_payment) {
    var artist_payments = this.state.artist_payments.filter(function(item) {
      return artist_payment.id !== item.id;
    });
    artist_payments.push(artist_payment)
    this.setState({artist_payments: artist_payments})
  },
  handleSortPayments(artist_payments) {
    this.setState({artist_payments: artist_payments})
  },
  formatDates(certification) {
    var formatted_date
    if (moment(certification.fiscal_start).format('Y') == moment(certification.fiscal_end).format('Y') ) {
      formatted_date = moment(certification.fiscal_start).format('MMM D') + " - " + moment(certification.fiscal_end).format('MMM D, YYYY');
    } else {
      formatted_date = moment(certification.fiscal_start).format('MMM D, YYYY') + " - " + moment(certification.fiscal_end).format('MMM D, YYYY');
    }
    return formatted_date
  },
  render() {
    return (
      <div className="dashboard">
        <div id="certifications" className="container collapse open">
          <div className="collapse__title">
            <h1><div className='title'><span>Certifications</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content certifications--teaser">
            <h4 className="th"><span>Fiscal Year</span><span>Application Status</span><span>Last Updated</span></h4>
            <Certifications
              certifications={this.state.certifications}
              user={this.state.user} />
          </div>
        </div>

        <div id="fee-schedule" className="container collapse">
          <div className="collapse__title">
            <h1><div className='title'><span>My Fee Schedule</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <div className='fee-schedule__certification-date'>{this.getCertificationDates()}</div>
            <FeeSchedule
              fee_categories={this.props.fee_categories}
              floor_categories={this.props.fee_categories}
              user={this.state.user}
              certification={this.state.certification}/>
          </div>
        </div>

        <div id="fee-tracker" className="container collapse">
          <div className="collapse__title">
            <h1><div className='title'><span>Fee Tracker</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <div className='fee-tracker__certification-date'>{this.getCertificationDates()}</div>
            <FeeTracker
              fee_categories={this.props.fee_categories}
              user={this.state.user}
              artist_payments={this.state.artist_payments}
              handleAddArtistPayment={this.props.handleAddArtistPayment}
              certification={this.state.certification}
              sortRowsBy={this.sortRowsBy}
              handleDeleteArtistPayment={this.handleDeleteArtistPayment}
              handleArtistPaymentUpdate={this.handleArtistPaymentUpdate}
              handleSortPayments={this.handleSortPayments}
              handleCertificationUpdate={this.handleCertificationUpdate}
              formatted_dates={this.formatDates(this.state.certification)} />
          </div>
        </div>

        <div id="account" className="container collapse">
          <div className="collapse__title">
            <h1><div className='title'><span>Account Info</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <UserContact
              user={this.props.user}
              errors={this.state.errors}
              handleUserUpdate={this.handleUserUpdate} />
            <a className='btn btn-lg admin-settings' href='/users/edit'><i className='fa fa-gear'></i> Settings</a>
          </div>
        </div>

      </div>
    );
  }
});
