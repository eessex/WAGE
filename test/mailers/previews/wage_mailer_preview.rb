class WageMailerPreview < ActionMailer::Preview

  def confirmation_instructions
    WageMailer.confirmation_instructions(User.first, "faketoken", {})
  end

  def submit_confirmation
    WageMailer.submit_confirmation(User.first, Certification.first)
  end

end
