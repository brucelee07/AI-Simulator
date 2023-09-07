from typing import Union
from pydantic import BaseModel


# TODO add branch to models
class Node(BaseModel):
    id: str
    title: str
    # subtitle to specific model
    subtitle: str = ''
    type: str = ''
    next: Union['Node', None] = None


class UploadImageSchema(BaseModel):
    node: Node
    title: str


class PredictData(BaseModel):
    middle_path: str
    data: list[float | str]


class PredictText(BaseModel):
    middle_path: str
    text: str
