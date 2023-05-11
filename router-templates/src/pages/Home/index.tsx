import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // 路由跳转
  const router = useNavigate();

  function toDetail() {
    router('/about');
  }

  return (
    <>
      <div>home 页</div>
      <br />
      <button onClick={toDetail}>去 about</button>
    </>
  );
};

export default Home;
