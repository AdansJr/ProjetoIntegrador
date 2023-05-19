import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import ErrorPage from './pages/error/error';
import HomePage from './pages/home/home';
import SchedulePage from './pages/schedule/index';
import CalendarPage from './pages/schedule/calendar';

import { PublicRoute } from './private_routes/p_routes.js';

export const Stack = () => {

  return (
    <Routes>
      <Route exact path="/" name="LoginPage" element={<LoginPage/>} />
      <Route exact path="/signUp" element={<SignUpPage/>} />
      <Route exact path="/ErrorPage" element={<ErrorPage/>} />
      <Route exact path="/home" element={<HomePage/>} />
      <Route exact path="/agendamento" element={<SchedulePage/>} />
      <Route exact path="/calendario" element={<CalendarPage/>} />
    </Routes>
  );
};
