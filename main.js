const { app, BrowserWindow } = require('electron');
const path = require('node:path')

console.log('Loading...')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})
	win.loadFile('index.html')
}

app.whenReady().then(() => {
	console.log('App is ready!')
	createWindow()

	app.on('activate', () => {
		console.log('on activate')
		if (BrowserWindow.getAllWindows.length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	console.log('detect window-all-closed')
	if (process.platform !== 'darwin') {
		console.log('quit')
		app.quit()
	}
})

