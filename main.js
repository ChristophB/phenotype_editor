const path = require('path')
const glob = require('glob')
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')
require('electron-dl')({ saveAs: true, openFolderWhenDone: true })
const { download } = require('electron-dl')

if (process.mas) app.setName('Electron APIs')

autoUpdater.autoDownload = false;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

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

		ipcMain.on('download-btn', (e, args) => {
			download(BrowserWindow.getFocusedWindow(), args.url, args.properties)
		})
	}
	app.on('ready', createWindow)

	app.on('window-all-closed', () => {
		app.quit()
	})

	app.on('activate', () => {
		if (mainWindow === null) {
			createWindow()
		}
	})

	app.on('ready', () => {
		autoUpdater.checkForUpdates()
	})

	autoUpdater.on('update-available', (info) => {
		var choice = dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
			type: 'question',
			buttons: [ 'Yes', 'no' ],
			title: 'Update available',
			message: 'An update is available. Do you want to download and install it now?'
		});
		if (choice === 0) autoUpdater.downloadUpdate()
	});
	autoUpdater.on('update-downloaded', (info) => {
		autoUpdater.quitAndInstall(false, true)
	})
}

function loadJs () {
	const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
	files.forEach((file) => { require(file) })
}

initialize()
