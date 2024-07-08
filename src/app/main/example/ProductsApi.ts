/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';

const api = axios.create({
	baseURL: 'https://happymilk.azurewebsites.net/api/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Credentials': true
	},
	withCredentials: true
});

const fetchProducts = async () => {
	try {
		const response = await api.get('/carts'); // Gọi API GET tới '/products'
		console.log('Dữ liệu sản phẩm:', response.data);
		return response.data; // Trả về dữ liệu từ API nếu cần thiết
	} catch (error) {
		console.error(error);
		throw error; // Xử lý lỗi nếu cần thiết
	}
};

export default fetchProducts;
