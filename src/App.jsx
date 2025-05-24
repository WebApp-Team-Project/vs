import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from './pages/MainPage';
import PostWritePage from './pages/PostWritePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/write' element={<PostWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
