// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require("electron");

document.querySelector("#dialog-1").onclick = () => {
  ipcRenderer.send("dialog-1");
};

document.querySelector("#dialog-2").onclick = () => {
  ipcRenderer.send("dialog-2");
};

document.querySelector("#dialog-3").onclick = () => {
  ipcRenderer.send("dialog-3");
};

document.querySelector("#dialog-4").onclick = () => {
  ipcRenderer.send("dialog-4");
};
