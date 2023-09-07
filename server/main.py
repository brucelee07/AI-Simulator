from fastapi import Depends, FastAPI, HTTPException, UploadFile, File, Form, status
from fastapi.encoders import jsonable_encoder
from pydantic_core import ValidationError

from schemas import Node, PredictData, PredictText, UploadImageSchema
from utils import stream_train_image, stream_train_model

app = FastAPI()


async def checker(data: str = Form(...)):
    try:
        model = Node.parse_raw(data)
    except ValidationError as e:
        raise HTTPException(detail=jsonable_encoder(e.errors()),
                            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)
    return model


"""
{"id": "1", "title": "node1", "type": "subtitle1", "next": {"id": "2", "title": "node2", "type": "subtitle2", "next": {"id": "3", "title": "node3", "type": "subtitle3", "next": null}}}
@app.post('/training')
"""


@app.post('/training')
async def training(node: Node = Depends(checker), file: UploadFile = File(...)):
    middle_path = stream_train_model(file, node)
    if middle_path is None:
        return {'error': 'model and data cannot be trained!'}
    return {'model': middle_path}


@app.post('/training_image')
async def training_image(input: UploadImageSchema):
    middle_path = stream_train_image(input.node, input.title)
    if middle_path is None:
        return {'error': 'model and data cannot be trained!'}
    return {'model': middle_path}


@app.post('/predict_data')
async def predict_data(input: PredictData):
    return {'input': input}

    # result = predict_result(input.middle_path, input.data)
    #
    # return {'result': result}


@app.post('/predict_text')
async def predict_text(input: PredictText):
    return {'input': input}

    # result = predict_from_text(input.middle_path, input.text)
    #
    # return {'result': result}


@app.post('/predict_image')
async def predict_image(middle_path: str, file: UploadFile = File(...)):

    # if file.filename is None:
    #     return {'error': 'file is broken'}
    # file_name = './temp/' + file.filename
    # with open(file_name, "wb") as f:
    #     f.write(file.file.read())
    # result = predict_from_image(middle_path, file_name)
    # return {'result': result}
    return {'middle_path': middle_path, 'file': file.filename}
