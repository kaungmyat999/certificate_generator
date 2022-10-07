const {encrypt,decrypt} = require('./encryption')
const { dialog, ipcMain,app, BrowserWindow } = require('electron')
const {PythonShell} = require('python-shell');
require('@electron/remote/main').initialize()
const get_Selected_FileName = require('./scripts/lib')
const path = require('path')
let win;
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            // enableRemoteModule: true,
            // sandbox: true
        }
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

})


ipcMain.on('select-dirs', async (event, arg) => {

    const result = await dialog.showOpenDialog(win, {
      properties: ['openFile']
    })
    
    if(result.filePaths.length >0) {
        let user_Selected_Path =result.filePaths;
        let selectFileName = get_Selected_FileName(user_Selected_Path[0])
        let encrypted_value = encrypt(user_Selected_Path[0]);
        
        event.sender.send("hasSelected",[encrypted_value,selectFileName])   
    }
    console.log('directories selected', result.filePaths)
  })

ipcMain.on('generate',(event,arg)=>{
    event = decrypt(event)
    let option = {
        args:[event,2]
    }

    PythonShell.run('./python_station/caller.py', option, function (err,result) {
        if (err) throw err;
        console.log('finished');
    });
})

  








