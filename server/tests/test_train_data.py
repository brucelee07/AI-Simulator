def test_traing_data(client):
    url = "/training"
    data = {
        'data':
        '{"id": "1", "title": "数据输入", "subtitle": "数据输入", "next": {"id": "2", "title": "基础模型", "subtitle": "线性回归", "next": {"id": "3", "title": "预测结果", "subtitle": "预测数据", "next": null}}}'
    }
    files = [('file', ("sample", open("./tests/sample.csv", "rb")))]
    res = client.post(url, files=files, data=data)

    assert res.status_code == 200
    assert "model" in res.json()

    model_path = res.json()['model']

    url = '/predict_data'
    data = {'data': [1, 1.1, 2.4, "E"], 'middle_path': model_path}
    res = client.post(url, json=data)
    assert res.status_code == 200
    assert 'result' in res.json()


def test_traing_text(client):
    url = "/training"
    data = {
        'data':
        '{"id": "1", "title": "数据输入", "subtitle": "文本输入", "next": {"id": "2", "title": "基础模型", "subtitle": "决策树", "next": {"id": "3", "title": "预测结果", "subtitle": "预测分类", "next": null}}}'
    }
    files = [('file', ("sample", open("./tests/sample_txt.csv", "rb")))]
    res = client.post(url, files=files, data=data)

    assert res.status_code == 200
    assert "model" in res.json()

    model_path = res.json()['model']

    url = '/predict_text'
    data = {
        'text':
        '“Do we know that his failure to comply beyond reasonable doubt wasn’t the result of accident, inadvertence or mistake?” Woodward said.',
        'middle_path': model_path
    }
    res = client.post(url, json=data)
    assert res.status_code == 200
    assert 'result' in res.json()


def test_traing_image(client):
    url = "/training_image"
    data = {
        'node': {
            "id": "1",
            "title": "数据输入",
            "subtitle": "文本输入",
            "next": {
                "id": "2",
                "title": "基础模型",
                "subtitle": "决策树",
                "next": {
                    "id": "3",
                    "title": "预测结果",
                    "subtitle": "预测分类",
                    "next": None
                }
            }
        },
        'title': '手写数字'
    }
    res = client.post(url, json=data)

    assert res.status_code == 200
    assert "model" in res.json()
    model_path = res.json()['model']
    files = [('file', ("jpg", open("./tests/5.jpg", "rb")))]
    url = f'/predict_image?middle_path={model_path}'
    res = client.post(url, files=files)
    assert res.status_code == 200
    assert 'result' in res.json()
