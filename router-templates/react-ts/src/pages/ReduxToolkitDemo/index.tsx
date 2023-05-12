import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReduxToolkitDemo = () => {
  // 路由跳转
  const router = useNavigate();

  const toHome = () => router('/home');

  return (
    <>
      <div>Redux Toolkit Demo 页</div>
      <br />
      <button onClick={toHome}>去 home</button>
    </>
  );
};

export default ReduxToolkitDemo;
