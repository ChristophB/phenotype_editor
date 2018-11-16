'use strict'

window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.SnackbarJs = require('snackbarjs')
window.Bootstrap = require('bootstrap-material-design')
window.JsTree = require('jstree')
window.BootstrapTable = require('bootstrap-table')
window.JquerySerializeJson = require('jquery-serializejson')
document.getElementById('app-version').innerHTML = require('electron').remote.app.getVersion()