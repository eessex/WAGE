class FileController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]
  # before_action :set_s3_direct_post, only: [:edit, :update]

  def show
    set_s3_direct_post
    render :json => { data: { 'form-data' => (@s3_direct_post.fields), 'url' => @s3_direct_post.url, 'host' => URI.parse(@s3_direct_post.url).host } }
  end
    #
   #  data: { 'form-data' => (@s3_direct_post.fields), 'url' => @s3_direct_post.url, 'host' => URI.parse(@s3_direct_post.url).host }
   # Use callbacks to share common setup or constraints between actions.
   # def set_user
   #   @the_user = current_user.id
   # end
   #
   # def set_s3_direct_post
   #   @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
   # end

   #Use callbacks to share common setup or constraints between actions.
  #  def set_user
  #    @the_user = current_user.id
  #  end

   def set_s3_direct_post
     @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
   end
end
