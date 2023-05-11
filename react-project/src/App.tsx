import './App.scss';
import routers from './routes/routerConfig';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin, Button } from 'antd';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  selectCount,
  decremented,
  incremented,
} from './store/feature/appSlice';
import { deleteUser, getUserData, selectUser } from './store/feature/userSlice';

function App() {
  const elements = useRoutes(routers);
  const count = useAppSelector(selectCount);

  const users = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <Button
          style={{ marginRight: '8px' }}
          type="primary"
          onClick={() => dispatch(incremented())}
        >
          +
        </Button>
        {count}
        <Button
          style={{ marginLeft: '8px' }}
          type="primary"
          onClick={() => dispatch(decremented(2))}
        >
          -
        </Button>
      </div>
      <div>
        <Button onClick={() => dispatch(getUserData())}>获取数据</Button>
        <ul>
          {users.map((user) => (
            <li
              onClick={() => dispatch(deleteUser(user.id))}
              key={user.id as string}
            >
              {user.login}
            </li>
          ))}
        </ul>
      </div>
      <Suspense fallback={<Spin />}>{elements}</Suspense>
    </>
  );
}

export default App;
