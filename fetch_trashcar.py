from itertools import chain
import requests
import json
from flask import request


def getTrashCar(offset=0):
    rep = requests.get(
        "https://data.taipei/api/v1/dataset/a6e90031-7ec4-4089-afb5-361a4efe7202?scope=resourceAquire",
        params={
            "limit": 1000,
            "offset": offset,
        },
    )
    return rep.json()["result"]["results"]


key_mapping = {
    "緯度": "lat",
    "經度": "lng",
    "抵達時間": "startTime",
    "離開時間": "endTime",
    "地點": "address",
    # non-important
    "行政區": "district",
    "里別": "village",
    "局編": "team1",
    "分隊": "team2",
    "車次": "trip",
    "車號": "plate",
    "路線": "route",
}


def rename(d):
    # {'_id': 20, '_importdate': {'date': '2024-10-17 08:36:53.125393', 'timezone_type': 3, 'timezone': 'Asia/Taipei'}, '行政區': '中山區', '里別': '龍洲里', '分隊': '南京分隊', '局編': '100-022', '車號': '121-BQ', '路線': '南京-1', '車次': '第1車', '抵達時間': '1731', '離開時間': '1745', '地點': '臺北市中山區興安街75號', '經度': '121.54284', '緯度': '25.05625'}
    translated_data = {v: d[k] for k, v in key_mapping.items()}
    translated_data["id"] = float(d["_id"])
    translated_data["lat"] = float(translated_data["lat"])
    translated_data["lng"] = float(translated_data["lng"])
    translated_data["dataTime"] = d["_importdate"]["date"]
    return translated_data


def fetchData():
    data = map(getTrashCar, range(0, 5000, 1000))  # current size 4038
    data = chain.from_iterable(data)
    data = map(rename, data)
    with open("trashcar.json", "w") as f:
        data = list(data)
        json.dump(data, f)


def host():
    with open("trashcar.json", "r") as f:
        data = json.load(f)
    # data = sorted(data, key=lambda x: x["id"])
    # breakpoint()

    new_data = []
    idset = set()
    for i, d in enumerate(data):
        if d["id"] in idset:
            continue
        idset.add(d["id"])
        new_data.append(d)
    data = new_data

    from flask import Flask, jsonify

    app = Flask(__name__)

    tile_size = 0.01
    def isInTile(car, lat, lng):
        lat1 = car['lat'] / tile_size
        lng1 = car['lng'] / tile_size
        lat2 = lat / tile_size
        lng2 = lng / tile_size
        return lat2 - 1 <= lat1 <= lat2 + 2 and lng2 - 1 <= lng1 <= lng2 + 2

    @app.route("/")
    def index():
        print(request.args)
        lat = float(request.args['lat'])
        lng = float(request.args['lng'])
        rep_data = [i for i in data if isInTile(i, lat, lng)]
        print(len(rep_data))
        return jsonify(rep_data)

    app.run(port=5001, debug=True)


# fetchData()
host()