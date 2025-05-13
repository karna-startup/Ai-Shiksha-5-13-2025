import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  // Extract the return URL from state if it exists
  const returnPath = location.state?.from?.pathname || '/';
  
  const onSubmit = async (data: FormValues) => {
    try {
      setAuthError(null);
      console.log("Attempting to sign in with:", data.email);
      const response = await signIn(data.email, data.password);
      
      if (response && response.user) {
        // On successful login, navigate to the return URL
        console.log("Sign in successful, navigating to:", returnPath);
        navigate(returnPath);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error codes from Supabase
      if (error.message?.includes('Email not confirmed') || error.code === 'email_not_confirmed') {
        setAuthError("Please verify your email before logging in. Check your inbox for a verification link.");
      } else if (error.message?.includes('Invalid login credentials')) {
        setAuthError("Invalid email or password. Please try again.");
      } else {
        // Set explicit error message
        setAuthError(error.message || "An error occurred during sign in. Please try again.");
      }
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-muted-foreground mt-2">
          Sign in to continue your learning journey
        </p>
      </div>
      
      {authError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      {...field} 
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isLoading}>
            {form.formState.isSubmitting || isLoading ? "Signing in..." : "Sign In"}
          </Button>
          
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate('/auth/register')}>
              Create one
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
