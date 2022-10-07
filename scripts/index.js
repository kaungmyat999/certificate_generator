
const {ipcRenderer} = require("electron");



let btn = document.getElementById('btn');
let generate_btn = document.getElementById('generate')
let input =document.getElementById('selected_file_path');
let hiddenText = document.getElementById('hT')
document.getElementById('upload').addEventListener('click',()=>{
  btn.click()
})

ipcRenderer.on("hasSelected",(event,arg)=>{
  
  hiddenText.value = arg[0]
  input.innerHTML = arg[1];
  console.log("Input Path ",input.value);
})



generate_btn.addEventListener('click',(event)=>{
  ipcRenderer.send('generate',hiddenText.value)
})

btn.addEventListener('click', (evt) => {
  evt.preventDefault();

  window.postMessage({
    type: 'select-dirs',
  })
})