import { app, ipcMain, Tray, Menu, BrowserWindow } from 'electron';

const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\');
}
// 开启debug
require('electron-debug')({ showDevTools: true });
let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;

let appIcon = null;
let flashIconTimer = null;

let iconPath = '/static/icon.ico';
if (process.env.NODE_ENV === 'development') {
  iconPath = '../../static/icon.ico';
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    frame: false,
    webPreferences: { webSecurity: false }
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 托盘
  appIcon = new Tray(path.join(__dirname, iconPath));

  let contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: function() {
        showMain();
      }
    },
    {
      label: '退出',
      click: function() {
        app.quit();
      }
    }
  ]);

  appIcon.setToolTip('v-im');
  appIcon.setContextMenu(contextMenu);
  appIcon.on('click', function() {
    showMain();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('min', () => mainWindow.minimize());

ipcMain.on('max', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

// 只是隐藏任务栏
ipcMain.on('close', () => {
  hideMain();
});

// 闪烁任务栏
ipcMain.on('flashFrame', () => {
  mainWindow.flashFrame(true);
});

let emptyIconPath = '/static/empty.ico';
if (process.env.NODE_ENV === 'development') {
  emptyIconPath = '../../static/empty.ico';
}
// 闪烁任务栏
ipcMain.on('flashIcon', () => {
  if (!mainWindow.isVisible()) {
    clearFlashIconTimer();
    let count = 0;
    flashIconTimer = setInterval(function() {
      count++;
      if (count % 2 === 0) {
        appIcon.setImage(path.join(__dirname, emptyIconPath));
      } else {
        appIcon.setImage(path.join(__dirname, iconPath));
      }
    }, 500);
  }
});

ipcMain.on('clearFlashIcon', () => {
  clearFlashIconTimer();
  appIcon.setImage(path.join(__dirname, iconPath));
});

/**
 * 展示窗口，打开任务栏
 */
function showMain() {
  mainWindow.setSkipTaskbar(false);
  mainWindow.show();

  clearFlashIconTimer();
  appIcon.setImage(path.join(__dirname, iconPath));
}

/**
 * 清除图片闪烁的定时器
 */
function clearFlashIconTimer() {
  if (flashIconTimer) {
    clearInterval(flashIconTimer);
  }
}

/**
 * 隐藏窗口，隐藏任务栏
 */
function hideMain() {
  mainWindow.setSkipTaskbar(true);
  mainWindow.hide();
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
