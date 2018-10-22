'use strict'

window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Bootstrap = require('bootstrap')
window.JsTree = require('jstree')
window.BootstrapTable = require('bootstrap-table')
window.JquerySerializeJson = require('jquery-serializejson')

function showMessage(text, state) {
	$('#message').remove();
	$('body').append(
		'<div id="message" class="alert alert-' + state + ' fade in">'
		+ '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
			+ $('<div>').text(text).html()
		+ '</div>'
	);
}