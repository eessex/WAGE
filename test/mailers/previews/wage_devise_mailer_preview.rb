class WageMailerPreview < ActionMailer::Preview

  def confirmation_instructions
    WageMailer.confirmation_instructions(User.first, "faketoken", {})
  end

end
