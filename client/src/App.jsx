import { Routes, Route, Navigate } from "react-router-dom";
import chat from './pages/chat';
import register from './pages/register';
import login from './pages/login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={chat} />
        <Route path="/register" element={register} />
        <Route path="/login" element={login} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
