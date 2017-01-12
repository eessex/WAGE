class FileController < ApplicationController

  def show
    set_s3_direct_post
    render :json => { data: { 'form-data' => (@s3_direct_post.fields), 'url' => @s3_direct_post.url, 'host' => URI.parse(@s3_direct_post.url).host } }
  end

   def set_s3_direct_post
     @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{current_user.id}/#{current_user.institution_name.parameterize}#{Time.now.strftime("/%Y/%m/%d/")}${filename}", success_action_status: '201', acl: 'public-read')
   end
end
