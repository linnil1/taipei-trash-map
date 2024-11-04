/** @type {import('./$types').PageServerLoad} */
export async function load({ platform }) {
	// return {'lastUpdateTime': "2024-11-01 01:10:01"}
	const data = await platform.env.data_trashcar.get('info', { type: 'json', cacheTtl: 86400 });
	return data;
}
