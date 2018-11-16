const settings = require('electron-settings')
const hostInput = document.getElementById('host-input')
const submitButton = document.getElementById('settings-submit')

hostInput.value = settings.get('host')

submitButton.addEventListener('click', (event) => {
	var host = hostInput.value

	if (host) {
		if (!host.match(/^https?:\/\/.*/)) host = 'http://' + host

		settings.set('host', host)

		hostInput.value = host
		showMessage('Settings updated!', 'success', true)
	}
})