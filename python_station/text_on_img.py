from PIL import Image, ImageFont, ImageDraw 
import os
def text_on_img(input_text,output_filename,dir,outputPath):
    print("Inside ", os.getcwd())
    my_image =  Image.open(dir+"/python_station/image.png")
    W,H = my_image.size
    title_font = ImageFont.truetype(dir+'/python_station/Fonts/Courgette/Courgette-Regular.ttf', 80)
    image_editable = ImageDraw.Draw(my_image)
    w, h  = image_editable.textsize(input_text)
    print("W",W,"H ",H, "w", w,'h',h)
    image_editable.text((((W-w)/2)-((w/6)*20), (H-h)/2), input_text, '#695d07',font=title_font)
    try:
        os.mkdir(os.path.join(outputPath,"outputs"))
    except:
        print("=== File Already Exist === ")
    res = outputPath+"\\outputs\\"+output_filename+".png"
    my_image.save(res)
    return



