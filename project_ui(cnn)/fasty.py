import json
from fastapi.responses import JSONResponse
from fastapi import FastAPI, UploadFile, File, Request
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI()

model = tf.keras.models.load_model("D:\\kaggle_prepared_dataset\\working_model3\\")
class_names = ['EarlyPreB', 'PreB', 'ProB', 'benign', 'no_cancer']


def read_file_as_image(data) -> np.ndarray:
    img = np.array(Image.open(BytesIO(data)))
    return img


@app.post("/predict")
async def predict(request: Request, file: UploadFile = File(...)):
    filename = file.filename
    bytes = (await file.read())
    bytes = read_file_as_image(bytes)
    bytes = bytes / 255
    bytes = tf.expand_dims(bytes, axis=0)
    pred = model.predict(bytes)
    result = np.argmax(pred[0])
    print(pred)
    url = "http://localhost:8000/predict"
    resul_mod = (class_names[result]) 
    print(resul_mod)
    #json.dumps({'prediction': resul_mod})
    #send(resul_mod)
    #return json.dumps({'Prediction:': resul_mod})
    #return resul_mod
    return {"prediction": resul_mod}
    #return JSONResponse(content={"result": resul_mod})

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)