
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import UserInfoFields from './registration/UserInfoFields';
import RoleSelector from './registration/RoleSelector';
import SchoolRegistrationTabs from './registration/SchoolRegistrationTabs';
import { useRegistrationForm } from './registration/useRegistrationForm';

export function RegistrationForm() {
  const navigate = useNavigate();
  const { form, handleSchoolCreated, onSubmit } = useRegistrationForm();
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple bg-clip-text text-transparent">
          Create Your Account
        </h1>
        <p className="text-muted-foreground mt-2">
          Join AI-Shiksha to access personalized learning resources
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UserInfoFields />
          <RoleSelector />
          
          {form.watch('role') !== 'guest' && (
            <SchoolRegistrationTabs onSchoolCreated={handleSchoolCreated} />
          )}
          
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
          
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate('/auth/login')}>
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
