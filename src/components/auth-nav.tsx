import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Home } from 'lucide-react';

export default function AuthNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
          <ShoppingBag className="h-8 w-8" />
          <span className="text-xl font-bold">ShopHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/catalog">Browse Products</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
