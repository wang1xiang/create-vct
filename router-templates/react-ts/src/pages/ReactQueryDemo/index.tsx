import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReactQueryDemo = () => {
  // 路由跳转
  const router = useNavigate();

  const toHome = () => router('/home');

  return (
    <>
      <div>React Query Demo 页</div>
      <br />
      <button onClick={toHome}>去 home</button>
    </>
  );
};

export default ReactQueryDemo;
