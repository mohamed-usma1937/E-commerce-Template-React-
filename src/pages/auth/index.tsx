import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LogIn, UserPlus, ArrowRight, Shield, Zap, Gift } from 'lucide-react';
import AuthNav from '@/components/auth-nav';
import loginIllustration from '@/assets/login-illustration.jpg';

export default function AuthIndex() {
  return (
    <div className="min-h-screen flex">
      <AuthNav />
      
      {/* Left Side - Choice Cards */}
      <div className="flex-1 flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Welcome to ShopHub</h1>
            <p className="text-xl text-muted-foreground">
              Choose how you'd like to access your account
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Secure & Protected</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Fast & Easy</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Gift className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Exclusive Benefits</span>
            </div>
          </div>

          {/* Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Login Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <LogIn className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Already have an account? Sign in to continue shopping
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Access your order history</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Manage your wishlist</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Get personalized recommendations</span>
                  </div>
                </div>
                
                <Button asChild className="w-full group-hover:bg-blue-600 transition-colors">
                  <Link to="/auth/login" className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Signup Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Join Our Community</CardTitle>
                <CardDescription>
                  New to ShopHub? Create an account to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Exclusive member discounts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Early access to sales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free shipping on orders</span>
                  </div>
                </div>
                
                <Button asChild variant="default" className="w-full group-hover:bg-green-600 transition-colors">
                  <Link to="/auth/signup" className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Options */}
          <div className="text-center space-y-4">
            <Separator />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Need help with your account?
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="link" asChild className="text-sm">
                  <Link to="/auth/forgot-password">Forgot Password?</Link>
                </Button>
                <Button variant="link" asChild className="text-sm">
                  <Link to="/help">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Continue shopping without an account
            </p>
            <Button variant="outline" asChild>
              <Link to="/catalog">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <img
            src={loginIllustration}
            alt="Authentication choice illustration"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Your Account, Your Way</h2>
            <p className="text-muted-foreground">
              Choose the authentication method that works best for you. 
              Whether you're returning or joining for the first time, 
              we've got you covered with a secure and seamless experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
