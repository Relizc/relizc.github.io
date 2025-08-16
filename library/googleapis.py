import base64
import json
import os
import types

import websockets
import asyncio

from google.cloud import storage
from google.cloud import vision as vision

from google.cloud.vision import ImageAnnotatorClient
import threading
import time
def allCapital(x:str)->bool:
    for i in x:
        if i.islower(): return False
    else: return True
CATEGORIES = {"E", "F"}
ROOM_FOR_ERROR = 2
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'application_default_credentials.json'
project_id = "library-reader-thing"
WORDS = "the and for you not are all new was can has but our one may out use any see his".upper().split()
CNT_WORDS = {}
for i in WORDS:CNT_WORDS[i] = 0
storage_client = storage.Client(project_id)
client = ImageAnnotatorClient()
img = "image.jpg"
with open(img,"rb") as f_obj:
    content = f_obj.read()
request = {
    'image': {
         'source': {'image_uri': img},
    },
}

async def handler(websocket, path):
    data = await websocket.recv()
    # reply = f"Data recieved as:  {data}!"

    dat = data.split(",")[1]
    content = base64.decodebytes(dat.encode())
    image = vision.Image(content=content)

    print("Parising with api")

    req(image)
    
    
    
    await websocket.send("OK")


def req(image):
    response = client.document_text_detection(image=image)
    document = response.full_text_annotation
    bounds = []
    for page in document.pages:
            for block in page.blocks:
                    bounds.append(block.bounding_box)
    print(bounds)
    fname = img.split("/")[-1]
    bucket = storage_client.get_bucket("libraryreaderupload")
    blob = bucket.blob(fname)
    blob.upload_from_filename(img)

    resultsbucket = storage_client.get_bucket("libraryreaderresults")
    while resultsbucket.get_blob(fname) == None:
        time.sleep(0.2)
    resultsblob = resultsbucket.get_blob(fname)
    print(resultsblob.exists())
    while not resultsblob.exists():
        time.sleep(0.1)
    res = str(resultsblob.download_as_text(storage_client))
    res_l = res.split()
    count_E = 0
    loc = 0
    beg = 0
    error = 0
    l_E = []
    print(res_l)
    for i in res_l:
        if i in CATEGORIES:
            count_E+=1
            beg = loc
            l_E.append(i)
        loc+=1

    authornames = []
    error = 0
    streak = 0
    for i in range(beg+1, len(res_l)):
        a = res_l[i]
        if allCapital(a) and len(a)>2:
            if len(a) == 3:
                authornames.append(a)
                streak += 1
                if streak>2:
                    error = 0

start_server = websockets.serve(handler, "localhost", 775)
asyncio.get_event_loop().run_until_complete(start_server)
print("server up")



asyncio.get_event_loop().run_forever()
