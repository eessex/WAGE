var CertificationGuidelines = React.createClass({
  getInitialState() {
    return {
      yearStatus: this.props.yearStatus,
    }
  },
  printYearStatus() {
    var year
    var prefix
    if (this.props.yearStatus == 'future') {
      prefix = "an "
      year = "upcoming"
    } else if (this.props.yearStatus == 'past') {
      prefix = "a "
      year = "prior"
    } else if (this.props.yearStatus == 'progress') {
      prefix = "the "
      year = "current"
    }
    return {
      year: year,
      prefix: prefix
    }
  },
  getSections() {
    var section
    var printYearStatus = this.printYearStatus()

    if (this.props.newUser == false) {
      if (this.props.yearStatus != 'past') {
      section = <div>
      <h4>Your organization is applying for W.A.G.E. Certification in {printYearStatus.prefix + printYearStatus.year} fiscal year.</h4>
        <h4>To process your application we will need the following documentation:</h4>
        <ul>
          <li>Total operating expenses for the year</li>
          <li>A projected operating budget</li>
        </ul>
        <h4>Your application is effectively a commitment to paying fees according to W.A.G.E. standards. Your status will be listed as W.A.G.E. Certified Pending until the close of the fiscal period, at which time a history of fee payments is required. Once you have demonstrated your organization’s compliance you will be listed and may list yourself as W.A.G.E. Certified.
        </h4>
      </div>

    } else {
      section = <div>
      <h4>Your organization is applying for W.A.G.E. Certification in {printYearStatus.prefix + printYearStatus.year} fiscal year.</h4>
        <h4>To process your application we will need the following documentation in order to establish that fees were paid according to W.A.G.E. standards:</h4>
        <h4>
        <ul>
          <li>Total operating expenses</li>
          <li>A history of fee payment</li>
          <li>A closed-out operating budget</li>
          <li>If available, form 990 for the year.</li>
        </ul></h4>
        <h4>Once you enter your total operating expenses, a customized fee schedule will be generated listing the minimum fees required for certification. The final step is to input your history of fee payment using the <a onClick={this.props.viewFeeTracker}>Fee Tracker</a>.</h4>
      </div>
    }

  } else {
    section = <div className="guidelines-new">
      <section>
        <h4>Your first application must be for a current or upcoming fiscal year and must include:</h4>
        <h4>
          <ul>
            <li>Your most recent 990</li>
            <li>Your 501c3 determination letter or documentation of fiscal sponsorship</li>
            <li>Templates of contracts used with artists</li>
            <li>A statement of intent on your organization’s letterhead</li>
          </ul>
        </h4>
        <h4>These documents only need to be submitted once.</h4>

        <h4>Your application must also include a projected operating budget for the current year with "Artist Fees" as a distinct and visible line item.</h4>
      </section>
    </div>
  }
    return section
  },
  render() {
    return (
      <div id="guidelines">
        {this.getSections()}
      </div>
    );
  }
});
