import pandas
import json

def xlsx_to_json_converter(xlsx_file):
    excel_data_df = pandas.read_excel(xlsx_file)
    thisisjson = excel_data_df.to_json(orient='records')
    x = '{ "name":"John", "age":30, "city":"New York"}'
    y = json.loads(thisisjson)
    return (y)

    # print('Excel Sheet to JSON:\n',(y[4]['Status']) )
