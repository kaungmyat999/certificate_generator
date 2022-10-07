from PIL import Image, ImageFont, ImageDraw 
import os
def text_on_img(input_text,output_filename):
    print("Inside ", os.getcwd())
    my_image =  Image.open("./python_station/image.png")
    W,H = my_image.size
    title_font = ImageFont.truetype('./python_station/Fonts/Courgette/Courgette-Regular.ttf', 80)
    image_editable = ImageDraw.Draw(my_image)
    w, h  = image_editable.textsize(input_text)
    print("W",W,"H ",H, "w", w,'h',h)
    image_editable.text((((W-w)/2)-((w/6)*20), (H-h)/2), input_text, '#695d07',font=title_font)
    my_image.save('./python_station/outputs/'+output_filename+".png")



