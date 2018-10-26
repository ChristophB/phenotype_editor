const path = require('path')
const glob = require('glob')
const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")

autoUpdater.checkForUpdatesAndNotify()

if (process.mas) app.setName('Electron APIs')

let mainWindow = null

function initialize() {
	loadJs()

	function createWindow () {
		mainWindow = new BrowserWindow({
			width: 1200, height: 900,
			minWidth: 1200, minHeight: 900,
			title: app.getName(),
			frame: false,
			icon: path.join(__dirname, 'assets/icons/png/64x64.png')
		})

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
