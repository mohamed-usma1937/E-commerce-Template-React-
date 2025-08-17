import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Package, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Error Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Error Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-red-600">404</h1>
              <h2 className="text-2xl font-bold">Page Not Found</h2>
              <p className="text-muted-foreground">
                Oops! The page you're looking for doesn't exist.
              </p>
            </div>
          </div>

          {/* Error Details */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <div className="text-sm space-y-2">
                <p className="font-medium text-center mb-3">Attempted to access:</p>
                <div className="bg-background p-3 rounded-lg border">
                  <code className="text-primary font-mono break-all">
                    {location.pathname}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link to="/" className="flex items-center justify-center">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/catalog" className="flex items-center justify-center">
                <Search className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Need Help?</CardTitle>
              <CardDescription className="text-center">
                Here are some things you can try:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-muted-foreground">
                  Check the URL for typos
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-muted-foreground">
                  Use the navigation menu above
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-muted-foreground">
                  Go back to the previous page
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
            <Package className="w-16 h-16 text-red-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Lost in the Digital Store?</h2>
            <p className="text-muted-foreground">
              Don't worry! Even the best shoppers sometimes take a wrong turn. 
              Use the navigation above or head back to our homepage to continue shopping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
