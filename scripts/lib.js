

const get_Selected_FileName = (input_String)=>{
    console.log("Input ",input_String);
    if(typeof(input_String) =='string'){
        let splited_arr =  input_String.split('\\')
        console.log("Sp",splited_arr);
        let res = splited_arr[(splited_arr.length) - 1]
        console.log("Inside FUnc",res);
        return res;
    }else{
        return "Selected"
    }
}

module.exports = get_Selected_FileName