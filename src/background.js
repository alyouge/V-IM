"use strict";

import { app, protocol, BrowserWindow, Tray, Menu, ipcMain } from "electron";
import {
  createProtocol
  /* installVueDevtools */
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

let appIcon = null;
let flashIconTimer = null;

if (process.env.NODE_ENV !== "development") {
  global.__static = path.join(__dirname, "/static").replace(/\\/g, "\\\\");
}

let iconPath = "/static/icon.ico";
let emptyIconPath = "/static/empty.ico";
if (process.env.NODE_ENV === "development") {
  iconPath = "../public/static/icon.ico";
  emptyIconPath = "../public/static/empty.ico";
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true, // 解决require is not defined问题
      webviewTag: true // 解决webview无法显示问题
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    mainWindow.loadURL("app://./index.html");
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  console.log("__dirname", __dirname);

  // 托盘
  appIcon = new Tray(path.join(__dirname, iconPath));

  let contextMenu = Menu.buildFromTemplate([
    {
      label: "显示",
      click: function() {
        showMain();
      }
    },
    {
      label: "退出",
      click: function() {
        app.quit();
      }
    }
  ]);

  appIcon.setToolTip("v-im");
  appIcon.setContextMenu(contextMenu);
  appIcon.on("click", function() {
    showMain();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("min", () => {
  mainWindow.minimize();
});

ipcMain.on("max", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

// 只是隐藏任务栏
ipcMain.on("close", () => {
  hideMain();
});

// 闪烁任务栏
ipcMain.on("flashFrame", () => {
  mainWindow.flashFrame(true);
});

// 闪烁任务栏
ipcMain.on("flashIcon", () => {
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

ipcMain.on("clearFlashIcon", () => {
  clearFlashIconTimer();
  appIcon.setImage(path.join(__dirname, iconPath));
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

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
