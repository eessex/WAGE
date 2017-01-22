var AdminUser = React.createClass({
	render() {
		return (
			<div key={this.props.user.id} data-user={this.props.user.id}>
				{this.props.user.institution_name}
			</div>
		);
	}
});