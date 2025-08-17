import { Link } from 'react-router-dom';
import { Package, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TechShop
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your one-stop destination for the latest tech products. Quality, innovation, and customer satisfaction are our top priorities.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Products', href: '/catalog' },
                { name: 'Categories', href: '/categories' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Service</h3>
            <nav className="space-y-2">
              {[
                { name: 'Help Center', href: '/help' },
                { name: 'Returns & Exchanges', href: '/returns' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@techshop.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Subscribe to get updates on new products and exclusive offers.
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-xl text-sm"
                />
                <Button size="sm" className="rounded-xl px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 TechShop. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}