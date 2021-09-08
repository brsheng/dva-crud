import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};
// 'errorHandler' 统一的异常处理，供开发者对请求发生的异常做统一处理
const errorHandler = (error: { response: Response }): Response => {
	const { response } = error;

	if (response && response.status) {
		const errorText = codeMessage[response.status] || response.statusText;
		const { status, url } = response;

		notification.error({
			message: `请求错误 ${status}: ${url}`,
			description: errorText,
		});
	} else if (!response) {
		notification.error({
			description: '您的网络发生异常，无法连接服务器',
			message: '网络异常',
		});
	}

	return response;
};

const request = extend({
	// errorHandler,
	// 'credentials' 发送带凭据的请求
	// 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
	// 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
	// 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
	credentials: 'include',
	// mode: 'no-cors',
	mode: 'cors',
	// 'responseType': 如何解析返回的数据，当 parseResponse 值为 false 时该参数无效
	// 默认为 'json', 对返回结果进行 Response.text().then( d => JSON.parse(d) ) 解析
	// 其他(text, blob, arrayBuffer, formData), 做 Response[responseType]() 解析
	requestType: 'json'
});

export default request;
