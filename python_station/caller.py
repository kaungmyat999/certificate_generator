from converter import xlsx_to_json_converter
from text_on_img import text_on_img
import datetime,sys

import os
src =  sys.argv[1]
dir = sys.argv[2]
outputPath = sys.argv[3]
print(sys.argv)
#src = 'C:\\Users\\kaung\\Downloads\\Testing_Folder\\sample.xlsx'
print(type(src), "Src => ",src)
data_arr = xlsx_to_json_converter(src)
for i in data_arr:
    if(i['Name']):
        date =datetime.datetime.now()
        res = i['Email']+str(date.year)+'-'+str(date.month)+"-"+str(date.day)+"-"+str(date.hour)+"-"+str(date.minute)+"-"+str(date.second)
        print(res)
        try:
            text_on_img(i['Name'],res,dir,outputPath)
        except:
            print("Error in creating images")

        print('Success!')
