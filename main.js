// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  globalShortcut
} = require("electron");
const url = require("url");
const path = require("path");

const icon = path.join(__dirname, "assets/image/icon.png");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    },
    icon
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Full screem
  // mainWindow.maximize();

  // and load the index.html of the app.
  // mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Dialogs
  dialogs();

  // globalShortcut
  shortcut();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Dialogs examples:
const dialogs = () => {
  ipcMain.on("dialog-1", (event, args) => {
    dialog.showErrorBox("404", "File not found");
  });

  ipcMain.on("dialog-2", (event, args) => {
    dialog.showMessageBox(
      {
        title: "Title",
        message: "Message",
        detail: "Detail",
        icon: icon,
        buttons: ["OK", "Cancel", "Test 01", "Test 02", "Test 03"]
      },
      (response, checkboxChecked) => {
        console.log(response);
      }
    );
  });

  ipcMain.on("dialog-3", (event, args) => {
    dialog.showOpenDialog(
      {
        title: "Search html files ...",
        buttonLabel: "Html file",
        message: "message",
        properties: ["openFile", "multiselections"],
        filters: [
          {
            name: "All",
            extensions: ["*"]
          },
          {
            name: "Web pages",
            extensions: ["htm", "html"]
          }
        ]
      },
      (filePath, bookmarks) => {
        console.log(filePath, bookmarks);
      }
    );
  });

  ipcMain.on("dialog-4", (event, args) => {
    dialog.showSaveDialog(
      {
        title: "Save html file",
        message: "message",
        buttonLabel: "Save html",
        nameFieldLabel: "File name",
        filters: [
          {
            name: "All",
            extensions: ["*"]
          },
          {
            name: "Text",
            extensions: ["txt"]
          },
          {
            name: "WebPage",
            extensions: ["htm", "html"]
          }
        ]
      },
      (filename, bookmark) => {
        console.log(filename);
      }
    );
  });
};

// Shortcut
const shortcut = () => {
  globalShortcut.register("CmdOrCtrl+j", () => {
    console.log(new Date().toISOString());
  });

  globalShortcut.register("alt+j", () => {
    dialog.showMessageBox({ icon, title: "Shortcut test", message: "ok" });
  });
};
