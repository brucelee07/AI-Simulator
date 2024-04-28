FROM python:3.11.2-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update && apt-get install -y python3-opencv

RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple --no-cache-dir

COPY . /app/ 

CMD ["uvicorn", "main:app", "--port", "7070"]
