const settings = require('electron-settings')
const remote   = require('electron').remote
const window   = remote.getCurrentWindow()

document.body.addEventListener('click', (event) => {
	if (event.target.dataset.section) {
		handleSectionTrigger(event)
		if (event.target.dataset.section == 'editor') {
			if (settings.get('activeOntologyId') == null) activateDefaultSection()
			document.getElementById('ontology-id-span').innerHTML = settings.get('activeOntologyId')
		}
		if (event.target.dataset.section == 'browser') {
			fillOntologyBrowser()
		}
	} else if (event.target.closest('.clickable-row') && event.target.localName == 'td' && $(event.target).attr('colspan') != 2) {
		settings.set('activeOntologyId', event.target.parentElement.firstElementChild.innerText)
		showEditorSection()
	} else if (event.target.id == 'create-ontology-button' && document.getElementById('ontology-id').value != '') {
		settings.set('activeOntologyId', document.getElementById('ontology-id').value)
		showEditorSection()
	}
})

document.getElementById('min-button').addEventListener("click", event => {
	var window = remote.getCurrentWindow()
	window.minimize()
});

document.getElementById('max-button').addEventListener("click", event => {
	var window = remote.getCurrentWindow()
	window.maximize()
	toggleMaxRestoreButtons()
});

document.getElementById('restore-button').addEventListener("click", event => {
	var window = remote.getCurrentWindow()
	window.unmaximize()
	toggleMaxRestoreButtons()
});

document.getElementById('close-button').addEventListener('click', function (e) {
	var window = remote.getCurrentWindow()
	window.close()
});

window.on('maximize', toggleMaxRestoreButtons);
window.on('unmaximize', toggleMaxRestoreButtons);

$('[data-toggle="tooltip"]').tooltip();

function toggleMaxRestoreButtons() {
	var window = remote.getCurrentWindow();
	if (window.isMaximized()) {
		document.getElementById('max-button').style.display = "none";
		document.getElementById('restore-button').style.display = "flex";
	} else {
		document.getElementById('restore-button').style.display = "none";
		document.getElementById('max-button').style.display = "flex";
	}
}

function fillOntologyBrowser() {
	if (settings.get('host')) {
		document.getElementById('refresh-ontology-table-button').click()
	}
}

function handleSectionTrigger (event) {
	hideAllSectionsAndDeselectButtons()

	event.target.classList.add('active')

	const sectionId = `${event.target.dataset.section}-section`
	document.getElementById(sectionId).classList.remove('d-none')

	const buttonId = event.target.getAttribute('id')
	settings.set('activeSectionButtonId', buttonId)
}

function activateDefaultSection () {
	document.getElementById('introduction-nav-item').click()
}

function showMainContent () {
	document.querySelector('.js-content').classList.remove('d-none')
}

function showEditorSection() {
	const section = document.getElementById('editor-nav-item')
	if (section) section.click()
	document.getElementById('refresh-phenotype-tree-button').click()
	document.getElementById('ontology-id-span').innerHTML = settings.get('activeOntologyId')
}

function hideAllSectionsAndDeselectButtons () {
	const sections = document.querySelectorAll('.js-section')
	Array.prototype.forEach.call(sections, (section) => {
	section.classList.add('d-none')
	})

	const buttons = document.querySelectorAll('.nav-link.active')
	Array.prototype.forEach.call(buttons, (button) => {
	button.classList.remove('active')
	})
}

const sectionId = settings.get('activeSectionButtonId')
if (sectionId) {
	showMainContent()
	const section = document.getElementById(sectionId)
	if (section) section.click()
} else {
	activateDefaultSection()
}