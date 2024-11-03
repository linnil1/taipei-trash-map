from functools import partial
from itertools import chain
import json

import requests
from flask import Flask, jsonify, request


key_mapping = {
    "緯度": "lat",
    "經度": "lng",
    "抵達時間": "startTime",
    "離開時間": "endTime",
    "地點": "address",
    # non-important
    "行政區": "district",
    "里別": "village",
    "局編": "bureau",
    "分隊": "team",
    "車次": "trip",
    "車號": "plate",
    "路線": "route",
}
PATH_DATA = "trashcar.json"
# data
# {'_id': 20, '_importdate': {'date': '2024-10-17 08:36:53.125393', 'timezone_type': 3, 'timezone': 'Asia/Taipei'}, '行政區': '中山區', '里別': '龍洲里', '分隊': '南京分隊', '局編': '100-022', '車號': '121-BQ', '路線': '南京-1', '車次': '第1車', '抵達時間': '1731', '離開時間': '1745', '地點': '臺北市中山區興安街75號', '經度': '121.54284', '緯度': '25.05625'}


def getTrashCar(offset=0):
    rep = requests.get(
        "https://data.taipei/api/v1/dataset/a6e90031-7ec4-4089-afb5-361a4efe7202?scope=resourceAquire",
        params={
            "limit": 1000,
            "offset": offset,
        },
    )
    return rep.json()["result"]["results"]


def rename(d):
    translated_data = {v: d[k] for k, v in key_mapping.items()}
    translated_data["id"] = float(d["_id"])
    translated_data["lat"] = float(translated_data["lat"])
    translated_data["lng"] = float(translated_data["lng"])
    translated_data["dataTime"] = d["_importdate"]["date"]
    return translated_data


def isAdd(data, keys, by):
    key = by(data)
    if key not in keys:
        keys.add(key)
        return True
    return False


def fetchData():
    data = map(getTrashCar, range(0, 5000, 1000))  # current size 4038
    data = chain.from_iterable(data)
    data = map(rename, data)
    keys = set()
    data = filter(partial(isAdd, keys=keys, by=lambda i: i["id"]), data)
    with open(PATH_DATA, "w") as f:
        data = list(data)
        json.dump(data, f)
    print("data:", len(data))
    print("Save in", PATH_DATA)


def host():
    with open(PATH_DATA, "r") as f:
        data = json.load(f)

    app = Flask(__name__)

    @app.route("/")
    def index():
        return jsonify(data)

    app.run(port=5001, debug=True)


# usage
# 1. python fetch_trashcar.py
# 2. python fetch_trashcar.py --host
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--host", action="store_true")
    args = parser.parse_args()
    if args.host:
        host()
    else:
        fetchData()
