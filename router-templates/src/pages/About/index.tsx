import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  // 路由跳转
  const router = useNavigate();

  function toDetail() {
    router('/home');
  }

  return (
    <>
      <div>About 页</div>
      <br />
      <button onClick={toDetail}>去 home</button>
    </>
  );
};

export default About;
