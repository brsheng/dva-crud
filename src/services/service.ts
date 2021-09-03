import request from '../utils/request';

const headers: Headers = new Headers({
	Accept: 'application/json',
	'Content-Type': 'application/json;charset=utf-8',
});

export async function GetEmployeesByCondition(url: string, payload: any): Promise<any> {
	return await post(url, payload);
}

export async function searchEmployee(url: string): Promise<any> {
	return await get(url)
}

export async function removeAndInsert(url: string, payload: any): Promise<any> {
	return await post(url, payload)
}

export async function deleteUser(url: string): Promise<any> {
	return await get(url)
}

export async function update(url: string, payload: any): Promise<any> {
	return await post(url, payload)
}

export async function get(url: string): Promise<any> {
	return await request(url, {
		headers,
		method: 'get',
	});
}

export async function post(url: string, payload: any): Promise<any> {
	return await request(url, {
		headers,
		method: 'post',
		data: payload,
	});
}

export async function put(url: string, payload: any): Promise<any> {
	return await request(url, {
		headers,
		method: 'put',
		data: payload,
	});
}

export async function remove(url: string): Promise<any> {
	return await request(url, {
		headers,
		method: 'delete',
	});
}