const settings = require('electron-settings')
const hostInput = document.getElementById('host-input')
const submitButton = document.getElementById('settings-submit')

hostInput.value = settings.get('host')

submitButton.addEventListener('click', (event) => {
	var host = hostInput.value

	if (host) {
		settings.set('host', host)
		showMessage('Settings updated!', 'success')
	}
})