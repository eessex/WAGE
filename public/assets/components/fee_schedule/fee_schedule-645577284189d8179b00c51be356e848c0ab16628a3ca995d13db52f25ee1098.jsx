var FeeSchedule = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      certification: this.props.certification
    }
  },
  componentDidMount() {
    this.revealDescription()
  },
  feeStatus() {
    var feeStatus
    if (this.props.certification.operating_expenses >= 15000000) {
      feeStatus = "max"
    } else if (this.props.certification.operating_expenses >= 5000000) {
      feeStatus = "over5m"
    } else if (this.props.certification.operating_expenses > 500000) {
      feeStatus = "min"
    } else {
      feeStatus = "floor"
    }
    return feeStatus
  },
  isMax() {
    var message
    if (this.feeStatus() == 'max') {
      message = <div className="message">
        <h4>If your operating budget is over $15,000,000 you are required to pay artist fees meeting Minimum W.A.G.E. standards but must also not exceed a Maximum W.A.G.E.</h4>
        <h4>To determine the Maximum W.A.G.E. please contact us directly: <a href="mailto: certification@wageforwork.com">certification@wageforwork.com</a>.</h4>
      </div>
    }
    return message
  },
  revealDescription() {
    $('#schedule-table .fee-category:not(.header)').mouseover(function(e) {
      $(this).addClass('active')
      $(this).siblings('.description').addClass('active')
    })
    $('#schedule-table .fee-category:not(.header)').mouseout(function(e) {
      $(this).removeClass('active')
      $(this).siblings('.description').removeClass('active')
    })
  },
  feeHeader() {
    var status = this.feeStatus()
    var fee_header
    var floor_info = <span className="subtitle floor">Minimum required for certification</span>
    var minimum_info = floor_info
    var recommended_info = <div className="subtitle recommended"></div>
    var max_info = <div className="subtitle maximum">Must not exceed average salary of institution’s full time employees</div>
    if (status == "floor" || status == "min") {
      fee_header = <div className="info__header">
                    <div className="info__title minimum">
                      <span className="category">Minimum Wage</span>
                      {minimum_info}
                    </div>
                   </div>
    } else if (status == "over5m") {
      fee_header = <div className="info__header">
                    <div className="info__title minimum">
                      <span className="category">Minimum Wage</span>
                      {minimum_info}
                    </div>
                    <div className="info__title recommended">
                      <span className="category">Recommended Wage</span>
                      {recommended_info}
                    </div>
                   </div>
    } else if (status == "max") {
      fee_header = <div className="info__header">
                    <div className="info__title minimum">
                      <span className="category">Minimum Wage</span>
                      {minimum_info}
                    </div>
                    <div className="info__title maximum">
                      <span className="category">Maximum Wage</span>
                      {max_info}
                    </div>
                   </div>
    }
    return fee_header
  },
  FeeCategoryRows() {
    var fee_categories = this.state.fee_categories.map( function(fee_category, i) {
    var status = this.feeStatus()
    var subtitle = <span className="info__fee-subtitle">{fee_category.fee_subtitle}</span>

    var floor_fee = Number(fee_category.floor_fee).toLocaleString()
    var min_fee = Number(this.state.certification.operating_expenses * Number(fee_category.over500K)).toLocaleString()
    var over5m = Number(5000000 * Number(fee_category.over500K)).toLocaleString()
    var existing_text = Number(((this.state.certification.operating_expenses/5000000) * Number(fee_category.over500K)) + .25 )

    var format_fee
    if (status == "floor") {
      format_fee = <div className="info__fee">
                    <div className="info__fee-amount minimum">
                      <span className="amount">${floor_fee}</span>
                      {subtitle}
                    </div>
                   </div>
    } else if (status == "min") {
      if (i == 11 || i == 12) {
        format_fee = <div className="info__fee">
                      <div className="info__fee-amount minimum">
                        <span className="amount">${existing_text.toLocaleString()}</span>
                        <span className="info__fee-subtitle">/word</span>
                      </div>
                    </div>
      } else if (i == 13) {
       format_fee = <div className="info__fee">
                      <div className="info__fee-amount minimum">
                        <span className="amount">${floor_fee}</span>
                        {subtitle}
                      </div>
                    </div>
     } else {
      format_fee = <div className="info__fee">
                      <div className="info__fee-amount minimum">
                      <span className="amount">${min_fee}</span>
                      {subtitle}
                    </div>
                  </div>
      }
    } else if (status == "over5m") {
      if (i == 11 || i == 12) {
       floor_fee = (Number(fee_category.over500K)) + .25
       format_fee = <div className="info__fee">
                     <div className="info__fee-amount minimum">
                        <span className="amount">${floor_fee}</span>
                        <span className="subtitle">/word</span>
                      </div>
                      <div className="info__fee-amount recommended">
                       <span className="amount">${existing_text.toLocaleString()}</span>
                       <span className="subtitle">/word</span>
                      </div>
                    </div>
     } else if (i == 13) {
      format_fee = <div className="info__fee">
                    <div className="info__fee-amount minimum">
                       <span className="amount">${floor_fee}</span>
                       {subtitle}
                     </div>
                      <div className="info__fee-amount recommended">
                        <span className="amount">${fee_category.over500K}</span>
                        <span className="subtitle">/day</span>
                     </div>
                   </div>
    } else {
      format_fee = <div className="info__fee">
                     <div className="info__fee-amount minimum">
                      <span className="amount">${over5m}</span>
                      {subtitle}
                    </div>
                    <div className="info__fee-amount recommended">
                      <span className="amount">${min_fee}</span>
                      {subtitle}
                    </div>
                  </div>
      }
    } else if (status == "max") {
      if (i == 11 || i == 12) {
       floor_fee = (Number(fee_category.over500K)) + .25
       format_fee = <div className="info__fee">
                     <div className="info__fee-amount minimum">
                        <span className="amount">${existing_text.toLocaleString()}</span>
                        <span className="subtitle">/word</span>
                      </div>
                      <div className="info__fee-amount maximum">
                        <span className="amount">TBD</span>
                      </div>
                    </div>
     } else if (i == 13) {
      format_fee = <div className="info__fee">
                     <div className="info__fee-amount minimum">
                      <span className="amount">${fee_category.over500K}</span>
                      <span className="subtitle">/day</span>
                      </div>
                      <div className="info__fee-amount maximum">
                        <span className="amount">TBD</span>
                      </div>
                  </div>
    } else {
      format_fee = <div className="info__fee">
                     <div className="info__fee-amount minimum">
                        <span className="amount">${over5m}</span>
                        {subtitle}
                      </div>
                      <div className="info__fee-amount maximum">
                        <span className="amount">TBD</span>
                      </div>
                    </div>
      }
    }
    var format_percent
    if (fee_category.id != 12 && fee_category.id != 13 && fee_category.id != 14 ){
      format_percent = <span className="percent">({Number(fee_category.over500K) * 100}% TAOE)</span>
    }

    return (
      <div key={fee_category.id} className="fee-category">
        <h5>
          <span className="title">
            <span className="category">{fee_category.name}</span>
            {format_percent}
          </span>
          {format_fee}
        </h5>
        <div className="description"><p>{fee_category.description}</p></div>
      </div>
      )
    }, this);
    return fee_categories
  },
  render() {
    return (
      <div id="fee-schedule">
      {this.isMax()}
      <div id="schedule-table">
        <div>
          <div className="fee-category header">
            <h5>
              <span className="title">
                <span>Fee Category</span>
              </span>
              {this.feeHeader()}
            </h5>
          </div>
          {this.FeeCategoryRows()}
        </div>
      </div>
    </div>
    )
  }
});

// Existing Text for Publication
// ((operating_expenses/5000000)*0.075)+0.025

// Commissioned Text for Publication
// ((operating_expenses/5000000)*0.75)+0.25

// Day Rate for Performers
