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


ipcMain.on('upload_btn_clicked', async (event, arg) => {
    console.log("Upload CLicked");
    const result = await dialog.showOpenDialog(win, {
      properties: ['openFile']
    })
    console.log(result.filePaths);
    if(result.filePaths.length >0) {
        let user_Selected_Path =result.filePaths;
        let selectFileName = get_Selected_FileName(user_Selected_Path[0])
        let encrypted_value = encrypt(user_Selected_Path[0]);
        
        event.sender.send("hasSelected_Input",[encrypted_value,selectFileName])   
    }
    console.log('Input directories selected', result.filePaths)
})

ipcMain.on('output_btn_clicked', async (event, arg) => {
    const result2 = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    })
    console.log(result2.filePaths);
    if(result2.filePaths.length >0) {
        let user_Selected_Path2 =result2.filePaths;
        let selectFileName2 = get_Selected_FileName(user_Selected_Path2[0])

        let encrypted_value2 = encrypt(user_Selected_Path2[0]);
        
        event.sender.send("hasSelected_Output",[encrypted_value2,selectFileName2])   
    }
    console.log('output directories selected', result2.filePaths)
})

ipcMain.on('generate',(event,arg)=>{
    console.log("Before G => ",arg);

    arg[0] = decrypt(arg[0])
    arg[1] = decrypt(arg[1])
    let option = {
        args:[arg[0],__dirname,arg[1]]
    }
    console.log(arg,"From Generate return");
    
    PythonShell.run(path.join(__dirname,'/python_station/caller.py'), option, function (err,result) {
        console.log(result);
        if(err) throw err;
        (err) ?  console.log(err) : event.sender.send('got_success',["Success!"]);
        console.log('finished');
    });
})

  








