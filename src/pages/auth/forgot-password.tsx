import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import AuthNav from '@/components/auth-nav';
import loginIllustration from '@/assets/login-illustration.jpg';

const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulation d'envoi d'email de récupération
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUserEmail(data.email);
      setIsEmailSent(true);
      
      toast({
        title: "Reset email sent!",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Failed to send reset email",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Email resent!",
        description: "Check your inbox again for the reset link.",
      });
    } catch (error) {
      toast({
        title: "Failed to resend email",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex">
        <AuthNav />
        {/* Left Side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-8 pt-24">
          <div className="w-full max-w-md space-y-8">
            {/* Success Header */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold">Check your email</h1>
              <p className="text-muted-foreground">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-primary">{userEmail}</p>
            </div>

            {/* Instructions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Click the link in the email to reset your password
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      The link will expire in 1 hour for security reasons
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Check your spam folder if you don't see the email
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleResendEmail}
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Resending...
                  </>
                ) : (
                  "Resend email"
                )}
              </Button>
              
              <Button 
                onClick={() => {
                  setIsEmailSent(false);
                  form.reset();
                }}
                variant="outline" 
                className="w-full"
              >
                Try different email
              </Button>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <img
              src={loginIllustration}
              alt="Password reset illustration"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">We've got you covered</h2>
              <p className="text-muted-foreground">
                Don't worry about forgetting your password. We'll help you get back into your account securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <AuthNav />
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Forgot your password?</h1>
            <p className="text-muted-foreground">
              No worries! Enter your email and we'll send you reset instructions
            </p>
          </div>

          {/* Security Notice */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For security reasons, we'll send a password reset link to your registered email address.
            </AlertDescription>
          </Alert>

          {/* Reset Form */}
          <Card>
            <CardHeader>
              <CardTitle>Reset password</CardTitle>
              <CardDescription>
                Enter your email address to receive a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10"
                              autoComplete="email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-medium">Still having trouble?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact our support team for additional help
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Get help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <img
            src={loginIllustration}
            alt="Forgot password illustration"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Don't panic!</h2>
            <p className="text-muted-foreground">
              Password resets are quick and secure. You'll be back to shopping in no time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
