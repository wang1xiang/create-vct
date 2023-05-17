import { Layout, Menu, Button, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  Link,
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import routers from '@/routes/routerConfig';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
const cx = classNames.bind(styles);

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const location = useLocation();
  const router = useNavigate();
  useEffect(() => {
    location.pathname === '/' ? router('/home') : null;
  }, [location.pathname]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    console.log(location.pathname);
    // 返回匹配到的路由数组对象，每一个对象都是一个路由对象˝
    const routes = matchRoutes(routers, location.pathname);
    const pathArr: string[] = [];
    if (routes !== null) {
      routes.forEach((item) => {
        const path = item.route.path;
        if (path) {
          pathArr.push(path);
        }
      });
    }
    setSelectedKeys(pathArr);
  }, [location.pathname]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={cx('demo-logo-vertical')} />
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          style={{ height: '100%', borderRight: 0 }}
        >
          {routers[0].children?.map((router) => (
            <Menu.Item key={router.path}>
              <Link to={'/' + router.path}>{router.meta?.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
