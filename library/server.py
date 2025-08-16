

import tkinter as tk
import threading

# create handler for each connection

import asyncio
import websockets

import base64

async def handler(websocket, path):
    data = await websocket.recv()
    # reply = f"Data recieved as:  {data}!"
    img = open("image.jpg", "wb")
    dat = data.split(",")[1]
    img.write(base64.decodebytes(dat.encode()))
    img.close()
    # print(reply)
    await websocket.send("OK")

start_server = websockets.serve(handler, "localhost", 775)

asyncio.get_event_loop().run_until_complete(start_server)
print("server up")
asyncio.get_event_loop().run_forever()

