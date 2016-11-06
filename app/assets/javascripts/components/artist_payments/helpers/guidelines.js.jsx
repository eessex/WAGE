var Guidelines = React.createClass({
  getInitialState() {
    return {
      isFuture: true,
      isPast: false,
      isProgress: false,
      isGeneral: true
    }
  },
  componentDidMount() {
    if (this.props.getYearStatus().future != null) {
      this.setState({isFuture: this.props.getYearStatus().future, isGeneral: false})
    }
    if (this.props.getYearStatus().past != null) {
      this.setState({isPast: this.props.getYearStatus().past, isGeneral: false})
    }
    if (this.props.getYearStatus().progress != null) {
      this.setState({isProgress: this.props.getYearStatus().progress, isGeneral: false})
    }
  },
  printYearStatus() {
    var year
    var prefix = "a "
    if (this.state.isFuture && (this.state.isPast == null)) {
      var prefix = "an "
      year = "upcoming"
    } else if (this.state.isPast) {
      year = "prior"
    } else if (this.state.isPast) {
      year = "current"
      var prefix = "the "
    }
    return {
      year: year,
      prefix: prefix
    }
  },
  getSections() {
    var section
    if (this.state.isGeneral == false) {
      if ((this.state.isFuture || this.state.isProgress) && (this.state.isPast == null)) {
      section = <div>
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
        <h4>To process your application we will need the following documentation in order to establish that fees were paid according to W.A.G.E. standards:</h4>
        <h4>
        <ul>
          <li>Total operating expenses</li>
          <li>A history of fee payment</li>
          <li>A closed-out operating budget</li>
          <li>If available, form 990 for {this.printYearStatus().year}</li>
        </ul></h4>
        <h4>Once you enter your total operating expenses, a customized fee schedule will be generated listing the minimum fees required for certification. The final step is to imput your history of fee payment under 'Artist Payments'.</h4>
      </div>
    }
  }
    return section
  },
  render() {
    return (
      <div id="guidelines">
        <h4>Your organization is applying for W.A.G.E. Certification in {this.printYearStatus().prefix + this.printYearStatus().year} fiscal year.</h4>
        {this.getSections()}
      </div>
    );
  }
});
