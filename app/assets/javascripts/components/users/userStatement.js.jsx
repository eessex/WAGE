var UserStatement = React.createClass({
  render() {
    var label = "Upload a letter on " + this.props.user.institution_name + "s letterhead detailing your interest in W.A.G.E. Certification."
    var subtitle = "Please tell us how getting certified relates to your organization’s mission and why you have chosen to pursue it."

    return (
      <div className="statement">
        <h4></h4>
        <UploadFile
          model={this.props.user}
          required='true'
          type='statement'
          handleFileUpdate={this.props.handleUserUpdate}
          accept='application/pdf,application/msword,
          application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          label={label}
          subtitle={subtitle}
        />
      </div>
    )
  }
});
