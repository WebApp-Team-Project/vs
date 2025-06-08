import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';
import PostViewPage from './pages/PostViewPage';
import ReviewPage from './pages/ReviewPage';
import ProfilePage from './pages/ProfilePage';
import NotificationPage from './pages/NotificationPage';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getUidFromLocalStorage, setUidToLocalStorage } from './libs/user';

function App() {
  useEffect(() => {
    const myUid = getUidFromLocalStorage();

    // 로컬스토리지에 uid가 없으면 생성
    if (!myUid) {
      const newUid = uuidv4();
      setUidToLocalStorage(newUid);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지 (MainPage) */}
        <Route path='/' element={<MainPage />} />

        {/* 게시글 상세 페이지 (PostViewPage) */}
        <Route path='/post/:id' element={<PostViewPage />} />

        {/* 게시글 작성 페이지 (PostWritePage) */}
        <Route path='/write' element={<PostWritePage />} />

        {/* 후기 페이지 (ReviewPage) */}
        <Route path='/review/:id' element={<ReviewPage />} />

        {/* 프로필 페이지 (ProfilePage) */}
        <Route path='/profile' element={<ProfilePage />} />

        {/* 알림 페이지 (NotificationPage) */}
        <Route path='/notification' element={<NotificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
