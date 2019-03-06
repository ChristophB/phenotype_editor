const settings = require('electron-settings')
const hostInput = document.getElementById('host-input')
const fhirServerInput = document.getElementById('fhir-server-input')
const submitButton = document.getElementById('settings-submit')

hostInput.value = settings.get('host') ? settings.get('host') : ''
fhirServerInput.value = settings.get('fhirServer') ? settings.get('fhirServer') : ''

submitButton.addEventListener('click', (event) => {
	var host = hostInput.value
	var fhirServer = fhirServerInput.value

	if (host) {
		if (!host.match(/^https?:\/\/.*/)) host = 'http://' + host

		settings.set('host', host)
		settings.set('fhirServer', fhirServer)

		hostInput.value = host
		showMessage('Settings updated!', 'success', true)
	}
})