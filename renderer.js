'use strict'

window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Materializer = require('materialize-css')
window.JsTree = require('jstree')
window.JquerySerializeJson = require('jquery-serializejson')
document.getElementById('app-version').innerHTML = require('electron').remote.app.getVersion()

function showMessage(text, state) {
	M.toast({ html: text });
}