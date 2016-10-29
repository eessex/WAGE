var CertificationShowFinished = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      user: this.props.user,
      artist_payments: this.props.artist_payments,
      sortBy: 'date',
      isFuture: false,
      canSubmit: false,
      hasFinancials: false,
      hasPayments: false,
      contentState: 1,
      sortDir: 'ASC'
    }
  },
  componentDidMount() {
    this.setState({ isFuture: this.isFuture(), canSubmit: this.canSubmit() })
    // this.setState({isFuture: this.isFuture(), canSubmit: this.canSubmit(this.state.certification, this.state.user), hasFinancials: this.hasFinancials(), hasPayments: this.hasPayments() })
  },
  canSubmit() {
    if ( this.hasFinancials() ) {
  //     this.isFuture() &&
  //     certification.file_990 &&
  //     certification.file_budget &&
  //     certification.operating_expenses &&
  //     user.file_501c3
      return true
    } else {
      return false
    }
  },
  isFuture() {
    if (new Date < Date.parse(this.state.certification.fiscal_start) ) {
      return true
    } else {
      return false
    }
  },
  hasFinancials() {
    if ( this.state.certification.operating_expenses &&
        this.state.certification.file_990 &&
        this.state.certification.file_budget &&
        this.state.user.file_501c3 ) {
      // console.log('has operating_expenses & file_990 & file_budget & file_501c3')
      return true
    }
  },
  hasPayments() {
    if ( this.state.artist_payments) {
      if (this.state.artist_payments.length > 9) {
        console.log('has payments')
        return true
      } else {
        return "progress"
      }
    } else {
      return false
    }
  },
  // applicationStatus() {
  //   if (this.props.certification.status != 2) {
  //     return 0
  //   } else {
  //     return 1
  //   }
  // },
  // _sortRowsBy(event) {
  //   var sortDir = this.state.sortDir;
  //   var sortBy = event.target.className.split(' ')[0];
  //   if (sortBy === this.state.sortBy) {
  //     sortDir = this.state.sortDir == 'ASC' ? 'DESC' : 'ASC';
  //   } else {
  //    sortDir = 'ASC';
  //   }
  //   var artist_payments = this.state.artist_payments.slice();
  //   artist_payments.sort((a, b) => {
  //     var sortVal = 0;
  //     if (a[sortBy] > b[sortBy]) {
  //       sortVal = 1;
  //     }
  //     if (a[sortBy] < b[sortBy]) {
  //       sortVal = -1;
  //     }
  //     if (sortDir === 'DESC') {
  //       sortVal = sortVal * -1;
  //     }
  //     return sortVal;
  //   });
  //   this.setState({sortBy, sortDir});
  //   this.setState({artist_payments: artist_payments});
  //   $('th').removeClass('active')
  //   $(event.target).addClass('active').toggleClass('ASC')
  // },
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
  // onCertificationSubmit() {
  //   var certification = this.state.certification
  //   certification.status = 2
  //   this.handleCertificationUpdate(certification)
  // },
  handleCertificationUpdate(certification) {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: certification,
      },
      url: '/certifications/' + certification.id + '.json',
      success: function(res) {
        that.setState({certification: res, canSubmit: that.canSubmit()})
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  // handleUserUpdate(user) {
  //   var that = this;
  //   $.ajax({
  //     method: 'PATCH',
  //     data: {
  //       user: user,
  //     },
  //     url: '/users' + '.json',
  //     success: function(res) {
  //       that.setState({user: user, canSubmit: that.canSubmit(that.state.certification, user)})
  //     },
  //     error: function(res) {
  //       that.setState({errors: res.responseJSON.errors});
  //     }
  //   });
  // },
  // paymentsSorted(artist_payments) {
  //   this.setState({artist_payments: artist_payments});
  // },
  formatDates() {
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_start).format('Y') ) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM D, YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM D, YYYY');
    } return formatted_date
  },
  // formatOperatingExpenses() {
  //   return this.state.certification.operating_expenses.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  // },
  getArtistPayments() {
    if (this.hasPayments()) {
      var payments = <ArtistPaymentsTable artist_payments={this.state.artist_payments} _sortRowsBy={this._sortRowsBy} paymentsSorted={this.paymentsSorted} handleDeleteArtistPayment={this.handleDeleteArtistPayment} fee_categories={this.props.fee_categories}/>
    } else {
      var payments
    }
    return payments
  },
  // actions() {
  //   if (!this.state.canSubmit) {
  //     var disabled = true
  //   } else {
  //     var disabled = false
  //   }
  //   var actions = <div id="actions" className="col-xs-12"><button disabled={disabled} className="btn btn-lg save" onClick={this.onCertificationSubmit}>Submit</button></div>
  //   return actions
  // },
  contentState() {
  // //   if (this.state.contentState == 0) {
  // //   var contentState = <Guidelines key="new-user-contact"/>
  // // } else if (this.state.contentState == 1) {
  // //   var contentState =  <div><h1><span>Fiscal Details</span></h1><CertificationFinancials certification={this.state.certification} user={this.state.user} certifications={this.props.certifications} handleCertificationUpdate={this.handleCertificationUpdate} canSubmit={this.state.canSubmit} handleUserUpdate={this.handleUserUpdate} isFuture={this.state.isFuture} /></div>
  // // } else if (this.state.contentState == 2) {
    if ( this.hasPayments() && this.isFuture() ) {
      var contentState =
        <div>
          <AmountBox artist_payments={this.state.artist_payments} certification={this.state.certification} />
          <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} isFuture={this.isFuture} certification={this.state.certification} fee_categories={this.props.fee_categories} handleCertificationUpdate={this.handleCertificationUpdate} formatted_dates={this.formatDates} />
          {this.getArtistPayments()}
        </div>
    } else {
      var contentState =
        <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} isFuture={this.isFuture} certification={this.state.certification} fee_categories={this.props.fee_categories} formatted_dates={this.formatDates} handleCertificationUpdate={this.handleCertificationUpdate} />
          // <ArtistPaymentNew handleAddArtistPayment={this.handleAddArtistPayment} certification={this.state.certification} fee_categories={this.props.fee_categories} formatted_dates={this.formatDates} handleCertificationUpdate={this.handleCertificationUpdate} />
      }
  // // } else if (this.state.contentState == 3) {
  //   var contentState =  <div>
  //         <h1><span>Application</span><small> * In Review</small></h1>
  //         <CertificationSubmitView user={this.state.user} certification={this.state.certification} artist_payment={this.state.artist_payments} isFuture={this.state.isFuture} handleSubmit={this.onCertificationSubmit}/>
  //       </div>
  // // }
    return contentState
  },
  setContentState(e) {
    this.setState({contentState: $(e.target).parent().data('id'), canSubmit: this.canSubmit()})
    $('.status .item').removeClass('active')
    $(e.target).parent().addClass('active')
  },
  render() {
  //   if (moment(this.state.certification.fiscal_start).format('YYYY') == moment(this.state.certification.fiscal_end).format('YYYY')) {
  //     var formatted_date = moment(this.state.certification.fiscal_start).format('YYYY')
  //   } else {
  //     var formatted_date = moment(this.state.certification.fiscal_start).format('YY') + "-" + moment(this.state.certification.fiscal_end).format('YY')
  //   }
  //   if (this.state.isFuture) {
  //     var payments
  //   } else {
  //     var payments = <div className="item" data-id="2" data-complete={this.hasPayments()}>
  //                 <i className="fa fa-check" aria-hidden="true"></i>
  //                 <span onClick={this.setContentState}>Artist Payments</span>
  //               </div>
  //   }
    return (
      <div id="certification" className="show finished">
        <div className="content">
        {this.contentState()}
        </div>
        <div className="status-img"><img src="https://s3.amazonaws.com/wagency/WAGE-Pending-Logo.png"/></div>
      </div>
    )
  // } else {
  //   return (
  //     <div id="certification" className="show">
  //       <h3><span className="title">New Certification: FY  {moment(this.state.certification.fiscal_start).format('YYYY')}</span></h3>
  //       <div className="new col-xs-12 col-sm-9 col-md-7">
  //       <CertificationFinancials certification={this.state.certification} user={this.state.user} certifications={this.props.certifications} handleCertificationUpdate={this.handleCertificationUpdate} canSubmit={this.state.canSubmit} handleUserUpdate={this.handleUserUpdate} isFuture={this.state.isFuture} />
  //       {this.actions()}
  //       </div>
  //     </div>
  //   )
  // }
  }
});
