const settings = require('electron-settings')

document.body.addEventListener('click', (event) => {
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  } else if (event.target.closest('.clickable-row') && event.target.localName == 'td') {
    settings.set('activeOntologyId', event.target.parentElement.firstElementChild.innerText)
    const section = document.getElementById('editor-nav-item')
    if (section) section.click()
  } else if (event.target.id == 'create-ontology-button' && document.getElementById('ontology-id').value != '') {
    settings.set('activeOntologyId', document.getElementById('ontology-id').value)
    const section = document.getElementById('editor-nav-item')
    if (section) section.click()
  }
})

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