import request from '../request';

/* 用户列表 */
export const getUserList = (searchName) =>
  request({
    url: `/api/search/users?q=${searchName}`,
    method: 'get',
  });
