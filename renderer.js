'use strict'

window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Bootstrap = require('bootstrap')
window.JsTree = require('jstree')
window.BootstrapTable = require('bootstrap-table')
window.JquerySerializeJson = require('jquery-serializejson')
document.getElementById('app-version').innerHTML = require('electron').remote.app.getVersion()

function showMessage(text, state) {
	$('#message').remove();
	$('body').append(
		`<div id="message" class="alert alert-dismissible alert-${state} fade show">
			<button type="button" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			${$('<div>').text(text).html()}
		</div>`
	);
}