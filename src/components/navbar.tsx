import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Search,
  Heart,
  Settings,
  LogOut,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/ui/search-bar';
import { CartDrawer } from '@/components/cart-drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Categories', href: '/categories' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TechShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  isActive(item.href) 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-sm mx-6">
            <SearchBar placeholder="Search products..." />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 p-0"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Search Button - Tablet */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden rounded-full w-9 h-9 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <CartDrawer>
              <Button variant="ghost" size="sm" className="relative rounded-full w-9 h-9 p-0">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </Badge>
                )}
              </Button>
            </CartDrawer>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative rounded-full w-9 h-9 p-0">
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center space-x-2 p-2">
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="rounded-xl">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden rounded-full w-9 h-9 p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 animate-slide-up">
            <div className="space-y-4">
              {/* Search Bar - Mobile */}
              <div className="px-2">
                <SearchBar placeholder="Search products..." />
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-2 py-3 text-base font-medium rounded-xl transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between px-2 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>

                  <CartDrawer>
                    <Button variant="ghost" size="sm" className="relative rounded-full w-10 h-10 p-0">
                      <ShoppingCart className="h-5 w-5" />
                      {totalItems > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                        >
                          {totalItems > 99 ? '99+' : totalItems}
                        </Badge>
                      )}
                    </Button>
                  </CartDrawer>
                </div>

                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors"
                    >
                      <img
                        src={user?.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium">{user?.firstName}</span>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    asChild 
                    size="sm" 
                    className="rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}