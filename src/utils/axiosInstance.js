import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.example.com', // Thay đổi baseURL thành API của bạn
	timeout: 10000, // Thời gian chờ tối đa
	headers: {
		'Content-Type': 'application/json'
	}
});

const request = (url, method = 'get', data = null) => {
	const config = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		url,
		method,
		headers: instance.defaults.headers
	};

	if (data) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		config.data = data;
	}

	return instance.request(config);
};

export default request;
