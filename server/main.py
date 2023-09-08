import asyncio

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException, UploadFile, File, Form, status
from fastapi.encoders import jsonable_encoder
from pydantic_core import ValidationError

from schemas import Node, PredictData, PredictText, UploadImageSchema
from utils import predict_from_image, predict_from_text, predict_result, stream_train_image, stream_train_model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def checker(data: str = Form(...)):
    try:
        model = Node.parse_raw(data)
    except ValidationError as e:
        raise HTTPException(detail=jsonable_encoder(e.errors()),
                            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
    return model


@app.post('/training')
async def training(node: Node = Depends(checker), file: UploadFile = File(...)):
    result = stream_train_model(file, node)
    if result is None:
        return {'error': 'model and data cannot be trained!'}
    return {'model': result[0], 'inputs': result[1]}


@app.post('/training_image')
async def training_image(input: UploadImageSchema):
    middle_path = await asyncio.to_thread(stream_train_image, input.node, input.title)
    if middle_path is None:
        return {'error': 'model and data cannot be trained!'}
    return {'model': middle_path}


@app.post('/predict_data')
async def predict_data(input: PredictData):

    result = await asyncio.to_thread(predict_result, input.middle_path, input.data)
    return {'result': result}


@app.post('/predict_text')
async def predict_text(input: PredictText):
    result = await asyncio.to_thread(predict_from_text, input.middle_path, input.text)

    return {'result': result}


@app.post('/predict_image')
async def predict_image(middle_path: str, file: UploadFile = File(...)):

    if file.filename is None:
        return {'error': 'file is broken'}
    file_name = './temp/' + file.filename
    with open(file_name, "wb") as f:
        f.write(file.file.read())
        predict_from_image
    result = await asyncio.to_thread(predict_from_image, middle_path, file_name)
    return {'result': result}
