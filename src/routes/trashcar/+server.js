const locations = [
    {
        id: 1,
        lat: 25.05111,
        lng: 121.53694,
        startTime: '1630',
        endTime: '1638',
        address:
            '\u81fa\u5317\u5e02\u4e2d\u5c71\u5340\u5efa\u570b\u5317\u8def1\u6bb569\u865f\u524d',
        district: '\u4e2d\u5c71\u5340',
        village: '\u529b\u884c\u91cc',
        team1: '100-021',
        team2: '\u9577\u5b89\u5206\u968a',
        trip: '\u7b2c1\u8eca',
        plate: '119-BQ',
        route: '\u9577\u5b89-3',
        dataTime: '2024-10-17 08:36:53.088231'
    },
    {
        id: 2,
        lat: 25.05194,
        lng: 121.54222,
        startTime: '1640',
        endTime: '1649',
        address:
            '\u81fa\u5317\u5e02\u4e2d\u5c71\u5340\u5357\u4eac\u6771\u8def3\u6bb5176\u865f\u524d(\u907c\u5be7\u8857\u53e3)',
        district: '\u4e2d\u5c71\u5340',
        village: '\u529b\u884c\u91cc',
        team1: '100-021',
        team2: '\u9577\u5b89\u5206\u968a',
        trip: '\u7b2c1\u8eca',
        plate: '119-BQ',
        route: '\u9577\u5b89-3',
        dataTime: '2024-10-17 08:36:53.100774'
    },
    {
        id: 3,
        lat: 25.05172,
        lng: 121.54338,
        startTime: '1650',
        endTime: '1658',
        address:
            '\u81fa\u5317\u5e02\u4e2d\u5c71\u5340\u5357\u4eac\u6771\u8def3\u6bb5214\u865f\u524d',
        district: '\u4e2d\u5c71\u5340',
        village: '\u529b\u884c\u91cc',
        team1: '100-021',
        team2: '\u9577\u5b89\u5206\u968a',
        trip: '\u7b2c1\u8eca',
        plate: '119-BQ',
        route: '\u9577\u5b89-3',
        dataTime: '2024-10-17 08:36:53.102319'
    }
]

import { json } from '@sveltejs/kit'

// The same in Map.svelte
const TILE_SIZE = 0.01

function isInTile(car, lat, lng) {
    const lat1 = car['lat'] / TILE_SIZE
    const lng1 = car['lng'] / TILE_SIZE
    const lat2 = lat / TILE_SIZE
    const lng2 = lng / TILE_SIZE
    return lat2 - 1 <= lat1 && lat1 <= lat2 + 2 && lng2 - 1 <= lng1 && lng1 <= lng2 + 2
}

export async function GET({ platform, url }) {
    // debug1
    // return json(locations)
    // debug2
    // const resp = await fetch("localhost:5001")
    // const data = await resp.json();
    // prod
    const data = await platform.env.data_trashcar.get('data', { type: 'json', cacheTtl: 86400 })
    const lat = parseFloat(url.searchParams.get('lat'))
    const lng = parseFloat(url.searchParams.get('lng'))
    const new_data = data.filter((car) => isInTile(car, lat, lng))
    return json(new_data)
}
