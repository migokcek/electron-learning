const { app, BrowserWindow, Menu } = require('electron');
const path = require("path");

const HEIGHT = 500;
const WIDTH = 800;

const createWindow = () => {
  const win = new BrowserWindow({
    height: HEIGHT,
    width: WIDTH,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  })

  win.loadFile("index.html")
};

app.whenReady().then(()=> {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") app.quit();
})

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      }
    ]
  },
  {
    label: "File",
    submenu: [
      {
        label: "Learn More",
      },
      {
        label: "Exit",
        click: () => app.quit()
      },
    ]
  }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);