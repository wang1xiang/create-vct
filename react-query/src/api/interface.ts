export interface resData<T> {
  success?: boolean;
  data: T;
  code: number;
  message: string;
}

/** 用户列表返回 */
export type UserType = { [props: string]: string | number | boolean };
/** github返回 */
export type GithubType = {
  total_count: number;
  items: UserType[];
  incomplete_results: boolean;
};
