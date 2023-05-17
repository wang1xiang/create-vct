import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCount,
  decremented,
  incremented,
} from '@/store/feature/appSlice';
import { deleteUser, getUserData, selectUser } from '@/store/feature/userSlice';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

function ReduxToolkitDemo() {
  const count = useAppSelector(selectCount);

  const users = useAppSelector(selectUser);

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
              className={cx('demo-li')}
            >
              {user.login}
            </li>
          ))}
        </ul>
      </div>
      <br />
    </>
  );
}

export default ReduxToolkitDemo;
