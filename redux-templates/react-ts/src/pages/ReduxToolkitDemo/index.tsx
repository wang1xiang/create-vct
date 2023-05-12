import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCount,
  decremented,
  incremented,
} from '@/store/feature/appSlice';
import { deleteUser, getUserData, selectUser } from '@/store/feature/userSlice';

function ReduxToolkitDemo() {
  const count = useAppSelector(selectCount);

  const users = useAppSelector(selectUser);
  const router = useNavigate();

  const toHome = () => router('/home');

  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <button
          style={{ marginRight: '8px' }}
          onClick={() => dispatch(incremented())}
        >
          +
        </button>
        {count}
        <button
          style={{ marginLeft: '8px' }}
          onClick={() => dispatch(decremented(2))}
        >
          -
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(getUserData())}>获取数据</button>
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
      <br />
      <button onClick={toHome}>去 home</button>
    </>
  );
}

export default ReduxToolkitDemo;
