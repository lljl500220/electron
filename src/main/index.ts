import {app, shell, BrowserWindow, Menu, ipcMain} from 'electron'
import {join} from 'path'
import {electronApp, optimizer, is} from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let load: any = null

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    // frame: false,
    // resizable: false,
    // frame: false,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: true,
    // transparent: true,
    ...(process.platform === 'linux' ? {icon} : {}),
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then(() => {
    })
    return {action: 'deny'}
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then(() => {
    })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then(() => {
    })
  }
  ipcMain.handle('ping', () => {
    if (load) {
      load.hide()
      load.close()
    }
    Menu.setApplicationMenu(null)
    mainWindow.maximize()
    mainWindow.show()
    return mainWindow.getContentSize()
  })
}

const showLoading = (): void => {
  load = new BrowserWindow({
    width: 960,
    height: 670,
    frame: false,
    backgroundColor: '#2376b7',
    webPreferences: {
      contextIsolation: true,
      // preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  // load.webContents.openDevTools()
  load.loadFile(join(__dirname, '../../resources/loading.html'))

  load.on('show', createWindow)
  load.show()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // createWindow()
  showLoading()
  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
