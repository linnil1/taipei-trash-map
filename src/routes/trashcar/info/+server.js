import { json } from '@sveltejs/kit';

export async function GET({ platform }) {
	// return json({'lastUpdateTime': "2024-11-01 01:10:01"});
	const data = await platform.env.data_trashcar.get('info', { type: 'json', cacheTtl: 86400 });
	return json(data);
}
