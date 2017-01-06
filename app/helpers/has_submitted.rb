module HasSubmitted
  def has_submitted(certifications)
    certifications.each do |certification|
      if certification.status >= 1
        return true
      end
    end
    return false
  end

end
