const { ipcRenderer } = require('electron')

const textfield = document.getElementById("selected-path")
const url = ""
var savePath;

ipcRenderer.on("reply", (event, arg) => {
  textfield.textContent = arg.filePaths[0]
  savePath = arg.filePaths[0]
})
ipcRenderer.on("dl-finish", (event, arg) => {
  console.log("dl finish")
})
const pathButton = document.getElementById("test")
pathButton.addEventListener('click', () => {
  ipcRenderer.send('openDialog', 'ping')
})

const dlButton = document.getElementById("dl")
dlButton.addEventListener('click', () => {
  console.log(savePath)
  ipcRenderer.invoke('dl', url, savePath);
})
