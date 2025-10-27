// pages/index.tsx

import React from 'react';
// 파일 구조에 따라 './App.tsx' 또는 '../App.tsx' 등 경로가 달라질 수 있습니다.
// App.tsx가 pages 폴더와 같은 레벨에 있다고 가정하고 아래와 같이 작성합니다.
import App from '../App'; 

// Next.js 페이지 컴포넌트 정의
const HomePage = () => {
  return <App />;
};

export default HomePage;