import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

export default function AuthQuickNav() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';
  const isSignupPage = location.pathname === '/auth/signup';
  const isRegisterPage = location.pathname === '/auth/register';

  // Ne pas afficher sur la page d'index d'auth
  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <Button
        variant={isLoginPage ? "default" : "outline"}
        size="sm"
        asChild
        className="rounded-full"
      >
        <Link to="/auth/login" className="flex items-center space-x-2">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Link>
      </Button>
      
      <Button
        variant={isSignupPage ? "default" : "outline"}
        size="sm"
        asChild
        className="rounded-full"
      >
        <Link to="/auth/signup" className="flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Quick Signup</span>
        </Link>
      </Button>
      
      <Button
        variant={isRegisterPage ? "default" : "outline"}
        size="sm"
        asChild
        className="rounded-full"
      >
        <Link to="/auth/register" className="flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Full Register</span>
        </Link>
      </Button>
    </div>
  );
}
