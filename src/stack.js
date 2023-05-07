import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import { PublicRoute } from './private_routes/p_routes.js';

export const Stack = () => {

  return (
    <Routes>
      <Route exact path="/" name="LoginPage" element={<LoginPage/>} />
      <Route exact path="/signUp" element={<SignUpPage/>} />
      
    </Routes>
  );
};
