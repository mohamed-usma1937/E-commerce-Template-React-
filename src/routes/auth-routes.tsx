import { Route } from 'react-router-dom';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import Signup from '@/pages/auth/signup';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';
import AuthIndex from '@/pages/auth/index';

export const authRoutes = [
  <Route key="auth-index" path="/auth" element={<AuthIndex />} />,
  <Route key="auth-login" path="/auth/login" element={<Login />} />,
  <Route key="auth-register" path="/auth/register" element={<Register />} />,
  <Route key="auth-signup" path="/auth/signup" element={<Signup />} />,
  <Route key="auth-forgot-password" path="/auth/forgot-password" element={<ForgotPassword />} />,
  <Route key="auth-reset-password" path="/auth/reset-password" element={<ResetPassword />} />,
];
