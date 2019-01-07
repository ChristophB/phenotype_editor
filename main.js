const path = require('path')
const glob = require('glob')
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')
require('electron-dl')({ saveAs: true, openFolderWhenDone: true })
const { download } = require('electron-dl')

if (process.mas) app.setName('Electron APIs')

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
		autoUpdater.checkForUpdatesAndNotify()
	})

	function sendStatusToWindow(text, status) {
		log.info(text);
		dialog.showMessageBox({ type: status, message: text })
	}
	autoUpdater.on('update-downloaded', (info) => {
		sendStatusToWindow('An update is available. Restart the app to install it.', 'info');
	});
}

function loadJs () {
	const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
	files.forEach((file) => { require(file) })
}

initialize()
