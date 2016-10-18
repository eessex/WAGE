class WageMailerPreview < ActionMailer::Preview
# preview at root/rails/mailers/wage_mailer/template_name
  def confirmation_instructions
    WageMailer.confirmation_instructions(User.first, "faketoken", {})
  end

  def submit_confirmation
    WageMailer.submit_confirmation(User.first, Certification.first)
  end

end
