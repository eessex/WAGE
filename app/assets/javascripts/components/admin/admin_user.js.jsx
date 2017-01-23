var AdminUser = React.createClass({
	 componentDidMount() {
    $('.user-container__title').click(function(e) {
    	e.preventDefault()
      $('.user-container').removeClass('active')
      var active = $(e.target).closest('.user-container').addClass('active')
      $('.user-container:not(.active)').find('.user-container__content').slideUp()
      debugger
      if ($(active).find('.user-container__content').css('display') == 'block') {
        $(active).removeClass('active')
      	debugger
        $(active).find('.user-container__content').slideUp()

      } else {
        $(active).find('.user-container__content').slideDown()
      }
    })
  },
	render() {
		return (
			<div key={this.props.user.id} data-user={this.props.user.id} className={"user-container user-container--" + this.props.user.id + " "}>
				<h4 className='user-container__title'>{this.props.user.institution_name}</h4>
				<div className='user-container__content'>
					<ReviewUserContact user={this.props.user} />
				</div>
			</div>
		);
	}
});