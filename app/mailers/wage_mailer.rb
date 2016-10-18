class WageMailer < Devise::Mailer
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  default template_path: 'devise/mailer'

 def confirmation_instructions(record, token, options={})
   # Use different e-mail templates for signup e-mail confirmation
   #   and for when a user changes e-mail address.
   if record.pending_reconfirmation?
     options[:template_name] = 'reconfirmation_instructions'
   else
     options[:template_name] = 'wage_confirmation_instructions'
   end
   super
  end

  def submit_confirmation(user, certification)
    @user = user
    @certification = certification
    @url  = 'http://localhost:3000'
    mail(to: @user.email, from: ENV['SENDMAIL_USERNAME'], subject: 'Your Application to W.A.G.E. has been received')
  end

end
