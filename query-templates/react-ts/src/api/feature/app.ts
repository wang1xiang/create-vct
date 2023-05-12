import { GithubType } from '../interface';
import request from '../request';

/* 用户列表 */
export const getUserList = (searchName: string) =>
  request<GithubType>({
    url: `/api/search/users?q=${searchName}`,
    method: 'get',
  });
