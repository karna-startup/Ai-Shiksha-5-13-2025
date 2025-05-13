
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string().optional(),
  ageGroup: z.string({ required_error: "Please select an age group" }),
  classLevel: z.string({ required_error: "Please select your class level" }),
  role: z.enum(['student', 'teacher', 'guest', 'school_admin'], { 
    required_error: "Please select your role" 
  }),
  schoolId: z.string().optional(),
  joinCode: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof formSchema>;

export const useRegistrationForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedSchool, setSelectedSchool] = useState<{ id: string, name: string } | null>(null);
  
  // Extract the return URL from state if it exists
  const returnPath = location.state?.from?.pathname || '/';
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      ageGroup: '',
      classLevel: '',
      role: 'student',
      schoolId: '',
      joinCode: '',
    },
  });
  
  const handleSchoolCreated = (schoolId: string, schoolName: string, joinCode: string) => {
    // Add the new school to the form values
    form.setValue('schoolId', schoolId);
    form.setValue('role', 'school_admin');
    
    // Store the selected school
    setSelectedSchool({ id: schoolId, name: schoolName });
    
    toast({
      title: "Important",
      description: `Your school join code is: ${joinCode}. Please save this code to allow others to join your school.`,
    });
  };
  
  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const role = data.role;
      let schoolId = data.schoolId;
      
      // If role is school_admin, teacher or student, ensure we have a schoolId
      if ((role === 'school_admin' || role === 'teacher' || role === 'student') && !schoolId) {
        if (role !== 'school_admin') {
          toast({
            title: "School required",
            description: "Please select a school or register as a guest.",
            variant: "destructive",
          });
          return;
        }
      }
      
      await signUp(data.email, data.password, {
        display_name: data.name,
        email: data.email,
        phone: data.phone,
        age_group: data.ageGroup,
        class_level: data.classLevel,
        role: data.role,
        school_id: schoolId || undefined,
      });
      
      toast({
        title: "Registration successful!",
        description: "You can now log in with your new account.",
      });
      
      // Navigate to login page
      navigate('/auth/login', { state: { from: { pathname: returnPath } } });
    } catch (error) {
      console.error('Registration error:', error);
      // Toast is already shown in the AuthContext
    }
  };
  
  return {
    form,
    handleSchoolCreated,
    onSubmit,
    selectedSchool
  };
};
