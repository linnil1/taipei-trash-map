const locations = 
/* [
  { id: 1, lat: 25.048238, lng: 121.553540, startTime: "2300", endTime: "2330", address: "1234" },
  { id: 2, lat: 25.048238, lng: 121.554540, startTime: "2200", endTime: "2300", address: "123" }
];*/
[{"id": 1, "lat": 25.05111, "lng": 121.53694, "startTime": "1630", "endTime": "1638", "address": "\u81fa\u5317\u5e02\u4e2d\u5c71\u5340\u5efa\u570b\u5317\u8def1\u6bb569\u865f\u524d", "district": "\u4e2d\u5c71\u5340", "village": "\u529b\u884c\u91cc", "team1": "100-021", "team2": "\u9577\u5b89\u5206\u968a", "trip": "\u7b2c1\u8eca", "plate": "119-BQ", "route": "\u9577\u5b89-3", "dataTime": "2024-10-17 08:36:53.088231"}, {"id": 2, "lat": 25.05194, "lng": 121.54222, "startTime": "1640", "endTime": "1649", "address": "\u81fa\u5317\u5e02\u4e2d\u5c71\u5340\u5357\u4eac\u6771\u8def3\u6bb5176\u865f\u524d(\u907c\u5be7\u8857\u53e3)", "district": "\u4e2d\u5c71\u5340", "village": "\u529b\u884c\u91cc", "team1": "100-021", "team2": "\u9577\u5b89\u5206\u968a", "trip": "\u7b2c1\u8eca", "plate": "119-BQ", "route": "\u9577\u5b89-3", "dataTime": "2024-10-17 08:36:53.100774"}, {"id": 3, "lat": 25.05172, "lng": 121.54338, "startTime": "1650", "endTime": "1658", "address": "\u81fa\u5317\u5e02\u4e2d\u5c71\u5340\u5357\u4eac\u6771\u8def3\u6bb5214\u865f\u524d", "district": "\u4e2d\u5c71\u5340", "village": "\u529b\u884c\u91cc", "team1": "100-021", "team2": "\u9577\u5b89\u5206\u968a", "trip": "\u7b2c1\u8eca", "plate": "119-BQ", "route": "\u9577\u5b89-3", "dataTime": "2024-10-17 08:36:53.102319"}]

import { json } from '@sveltejs/kit';

export async function GET() {
	// return json(locations)
  let resp = await fetch("localhost:5001")
  let data = await resp.json()
  return json(data)
}