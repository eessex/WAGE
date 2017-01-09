// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require underscore
//= require react
//= require react_ujs
//= require ./vendor/jquery.ui.widget
//= require ./vendor/jquery.fileupload
//= require components


$(function() {
    $('.notice').delay(3500).fadeOut();
    $('.notices').delay(3500).fadeOut();
    $('.alert').delay(3500).fadeOut();

    $('.fa-bars, .fa-close').click(function(e){
    	$(e.target).toggleClass('fa-bars').toggleClass('fa-close')
    })

    $('.intro.one').click(function(e) {
    	var height = $(window).height()
    	 $('html, body').animate({scrollTop: height}, 1000)
    })

		$(document).click(function(e) {
      $('.dropdown .fa-close').toggleClass('fa-close').toggleClass('fa-bars')
		})

});
