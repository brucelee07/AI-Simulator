import sys
import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

parent_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))

sys.path.append(parent_folder)


@pytest.fixture(scope="module")
def client():
    from main import app
    yield TestClient(app)

    folds = ['./temp', './models', './data_process']
    for fold in folds:
        dir = Path(fold)
        for file in dir.iterdir():
            file.unlink()
