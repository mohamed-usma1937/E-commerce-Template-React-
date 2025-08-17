import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import AuthNav from '@/components/auth-nav';
import loginIllustration from '@/assets/login-illustration.jpg';

// Schéma de validation sécurisé pour la réinitialisation
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    color: 'text-gray-400'
  });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Validation en temps réel du mot de passe
  const validatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = '';
    let color = 'text-gray-400';

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Very weak';
        color = 'text-red-500';
        break;
      case 2:
        feedback = 'Weak';
        color = 'text-orange-500';
        break;
      case 3:
        feedback = 'Fair';
        color = 'text-yellow-500';
        break;
      case 4:
        feedback = 'Good';
        color = 'text-blue-500';
        break;
      case 5:
        feedback = 'Strong';
        color = 'text-green-500';
        break;
    }

    setPasswordStrength({ score, feedback, color });
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast({
        title: "Invalid reset link",
        description: "The password reset link is invalid or has expired.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulation de réinitialisation du mot de passe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      toast({
        title: "Password reset successful!",
        description: "Your password has been updated. You can now sign in with your new password.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Password reset failed",
        description: "An error occurred while resetting your password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Vérification du token
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please request a new password reset link from the login page.
            </p>
            <Button asChild className="w-full">
              <Link to="/auth/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
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
              <h1 className="text-3xl font-bold">Password updated!</h1>
              <p className="text-muted-foreground">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>

            {/* Security Tips */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-center mb-3">Security Tips</h3>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Use a unique password that you don't use elsewhere
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Consider using a password manager for better security
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Enable two-factor authentication if available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button asChild className="w-full">
              <Link to="/auth/login">Sign in with new password</Link>
            </Button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <img
              src={loginIllustration}
              alt="Password reset success illustration"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">You're all set!</h2>
              <p className="text-muted-foreground">
                Your account is now secure with your new password. Welcome back!
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
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground">
              Create a new secure password for your account
            </p>
          </div>

          {/* Security Notice */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Choose a strong password that you'll remember. This will be your new login password.
            </AlertDescription>
          </Alert>

          {/* Reset Form */}
          <Card>
            <CardHeader>
              <CardTitle>New password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your new password"
                              className="pl-10 pr-10"
                              autoComplete="new-password"
                              onChange={(e) => {
                                field.onChange(e);
                                validatePasswordStrength(e.target.value);
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        {/* Password Strength Indicator */}
                        {field.value && (
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`h-2 w-8 rounded-full ${
                                      level <= passwordStrength.score
                                        ? passwordStrength.color.replace('text-', 'bg-')
                                        : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className={`text-sm ${passwordStrength.color}`}>
                                {passwordStrength.feedback}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>Password must contain:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li className={/[a-z]/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                                  At least one lowercase letter
                                </li>
                                <li className={/[A-Z]/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                                  At least one uppercase letter
                                </li>
                                <li className={/\d/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                                  At least one number
                                </li>
                                <li className={/[@$!%*?&]/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                                  At least one special character (@$!%*?&)
                                </li>
                                <li className={field.value.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                                  At least 8 characters long
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your new password"
                              className="pl-10 pr-10"
                              autoComplete="new-password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        Updating password...
                      </>
                    ) : (
                      "Update password"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <img
            src={loginIllustration}
            alt="Reset password illustration"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Secure your account</h2>
            <p className="text-muted-foreground">
              Choose a strong password to keep your account safe and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
