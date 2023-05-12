import { message } from 'antd';
import Axios from 'axios';

// 统一配置
const baseURL = '';
export const service = Axios.create({
  baseURL,
  responseType: 'json',
  timeout: 600000,
});

// 请求拦截
service.interceptors.request.use((res) => {
  res.headers.token = 'token';
  return res;
});

// 拦截响应
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 这块需要修改 根据请求返回成功标志
    if (res || res.success) {
      if (res.message) message.success(res.message, 3);
      return response;
    } else {
      if (res.message) {
        message.error(res.message, 3);
        if (res.code === 401) {
          window.location.href = '/login';
        }
      }
      return Promise.reject(res);
    }
  },
  (err) => {
    message.error(err.message, 5);
    return Promise.reject(err);
  }
);

// 设置返回值和请求值范型
export default function request(req) {
  return service(req).then(
    (res) => {
      return res.data;
    },
    (res) => {
      return Promise.reject(res.data || res);
    }
  );
}
