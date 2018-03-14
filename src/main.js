const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    // Keep application open on OS X
    app.quit();
  }
});

app.on('ready', function() {
  const distDir = __dirname + "/../dist";
  mainWindow = new BrowserWindow({width: 1000, height: 800});
  mainWindow.loadURL('file://' + distDir + '/index.html');
  mainWindow.webContents.send('app-ready', app);

  mainWindow.webContents.openDevTools(); // TODO: (TMP)

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', function() {
    // Send an initialization event to the render process
    // Can't send the full `app` object because it gets serialized into JSON
    const config = {
        userDataPath: app.getPath('userData')
    };
    mainWindow.webContents.send('app-ready', config);
  });

});
