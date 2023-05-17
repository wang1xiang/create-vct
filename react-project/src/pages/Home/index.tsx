import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // 路由跳转
  const router = useNavigate();

  const toRedux = () => router('/toolkit');
  const toQuery = () => router('/query');

  return (
    <>
      <div>home 页</div>
      <br />
      <button onClick={toRedux}>查看redux-toolkitDemo</button>
      <br />
      <br />
      <button onClick={toQuery}>查看react-queryDemo</button>
    </>
  );
};

export default Home;
