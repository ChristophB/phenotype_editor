const path = require('path')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')

if (process.mas) app.setName('Electron APIs')

let mainWindow = null

function initialize() {
	loadJs()

	function createWindow () {
		mainWindow = new BrowserWindow({ width: 800, height: 600, title: app.getName() })
		// TODO: add { frame: false } and some exit button

		mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

	    mainWindow.on('closed', () => {
            mainWindow = null
        })
	}
	app.on('ready', createWindow)

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
      	    app.quit()
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

function loadJs () {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
    files.forEach((file) => { require(file) })
}

initialize()
