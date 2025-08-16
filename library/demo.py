import io

from flask import Flask, redirect, render_template, url_for,request
import base64
from PIL import Image
import json
import os
import types

from google.cloud import storage
from google.cloud import vision as vision

from google.cloud.vision import ImageAnnotatorClient
import threading
import time

app = Flask(__name__)
def allCapital(x: str) -> bool:
    for i in x:
        if i.islower(): return False
    else:
        return True
def process():
    CATEGORIES = {"E", "F"}
    ROOM_FOR_ERROR = 2
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'application_default_credentials.json'
    project_id = "library-reader-thing"
    WORDS = "the and for you not are all new was can has but our one may out use any see his".upper().split()
    CNT_WORDS = {}
    for i in WORDS: CNT_WORDS[i] = 0
    storage_client = storage.Client(project_id)
    client = ImageAnnotatorClient()
    img = "process.png"
    with open(img, "rb") as f_obj:
        content = f_obj.read()
    request = {
        'image': {
            'source': {'image_uri': img},
        },
    }
    image = vision.Image(content=content)
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
    while not storage_client.get_bucket("libraryreaderresults").get_blob(fname).exists():
        time.sleep(0.2)
    resultsblob = storage_client.get_bucket("libraryreaderresults").get_blob(fname)
    res = str(resultsblob.download_as_text(storage_client))
    res_l = res.split()
    count_E = 0
