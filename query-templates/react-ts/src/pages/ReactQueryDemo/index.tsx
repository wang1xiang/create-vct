import { getUserList } from '@/api/feature/app';
import { UserType } from '@/api/interface';
import { QUERY_USER_LIST } from '@/api/query/query.constant';
// import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const ReactQueryDemo = () => {
  // 不使用react-query时的请求
  // const [loading, setLoading] = useState(false);
  // const [users, setUsers] = useState<UserType[]>([]);
  // const getList = () => {
  //   setLoading(true);
  //   getUserList('wang')
  //     .then((res) => setUsers(res.data.items))
  //     .finally(() => setLoading(false));
  // };
  // useEffect(() => getList(), []);
  // 使用react-query
  const { data: users, isLoading: loading } = useQuery(
    QUERY_USER_LIST,
    () => getUserList('wang'),
    {
      select: (res) => res.data.items,
    }
  );
  return (
    <>
      {loading && <div>loading...</div>}
      <ul>
        {users?.map((user: UserType) => (
          <li key={user.id as string}>{user.login}</li>
        ))}
      </ul>
    </>
  );
};

export default ReactQueryDemo;
