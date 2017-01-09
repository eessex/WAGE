var CertificationMaterials = React.createClass({
  render() {
    return (
      <div className="materials">
        <UploadFile
          model={this.props.user}
          required='true'
          type='file_501c3'
          handleFileUpdate={this.props.handleUserUpdate}
          accept='application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel'
          label='501c3'
          subtitle='Your 501c3 letter of determination or, if you are fiscally sponsored, documentation of sponsorship.' />
        <UploadFile
            model={this.props.certification}
            type='file_990'
            handleFileUpdate={this.props.handleCertificationUpdate}
            accept='application/pdf'
            label="Form 990"
            subtitle="Most recent, if available" />
        <UploadFile
          model={this.props.certification}
          required='true'
          type='file_contract'
          handleFileUpdate={this.props.handleCertificationUpdate}
          accept='application/pdf'
          label="Sample Contracts"
          subtitle="A PDF of templates for any contracts used with artists." />
        <UploadFile
          model={this.props.user}
          required='true'
          type='statement'
          handleFileUpdate={this.props.handleUserUpdate}
          accept='application/pdf,application/msword,
          application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          label='Statement of Intent'
          subtitle={"Upload a letter on " + this.props.user.institution_name + "'s letterhead detailing your interest in W.A.G.E. Certification. Please tell us how getting certified relates to your organization’s mission and why you have chosen to pursue it."} />
      </div>
    )
  }
});
