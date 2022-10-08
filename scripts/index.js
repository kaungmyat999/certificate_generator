
const {ipcRenderer} = require("electron");



let upload_btn = document.getElementById('upload_btn');
let output_btn = document.getElementById('output_btn');
let upload_input = document.getElementById('upload_input');
let output_input = document.getElementById('output_input')
let generate_btn = document.getElementById('generate')
let input =document.getElementById('selected_file_path');
let output =document.getElementById('selected_file_path2')
let input_HiddenText = document.getElementById('upload_hT')
let output_hiddenText = document.getElementById('output_hT')
let gotSuccessBtn = document.getElementById('gotSuccess_btn');
document.getElementById('upload_btn').addEventListener('click',()=>{
  upload_input.click()
})

document.getElementById('output_btn').addEventListener('click',()=>{
  output_input.click()
})

ipcRenderer.on("hasSelected_Input",(event,arg)=>{
  console.log(arg,"from index");
  input_HiddenText.value = arg[0]
  input.innerHTML = arg[1];
  console.log("Input Path ",input_HiddenText.value);

})

ipcRenderer.on('hasSelected_Output',(event,arg)=>{
  console.log("arg => ",arg);
  output_hiddenText.value = arg[0];
  output.innerHTML = arg[1];

  console.log("Output Path ",output_hiddenText.value);

})

ipcRenderer.on('got_success',(event,arg)=>{
  console.log("GS => ",arg);
  gotSuccessBtn.innerHTML = arg[0]
  gotSuccessBtn.style.display = 'block'
})


generate_btn.addEventListener('click',(event)=>{
  console.log("Gen Btn vlaue => ",document.getElementById('upload_hT').value,document.getElementById('output_hT').value);
  ipcRenderer.send('generate',[document.getElementById('upload_hT').value,document.getElementById('output_hT').value])
})

upload_input.addEventListener('click', (evt) => {
  console.log("Upload CLicked");
  evt.preventDefault();
  // window.postMessage({
  //   type: 'select-dirs',
  // })
  ipcRenderer.send('upload_btn_clicked')
})

output_input.addEventListener('click',(event)=>{
  console.log("select btn clicked");
  event.preventDefault();
  window.postMessage({
    type: 'select-dirs',
  })
  //ipcRenderer.send('output_btn_clicked')
})