
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  schoolName: z.string().min(2, { message: "School name must be at least 2 characters long" }),
});

type FormValues = z.infer<typeof formSchema>;

interface SchoolRegistrationProps {
  onSchoolCreated: (schoolId: string, schoolName: string, joinCode: string) => void;
}

const SchoolRegistration: React.FC<SchoolRegistrationProps> = ({ onSchoolCreated }) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Generate a unique join code (6 characters)
      const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Insert the new school into the database
      const { data: school, error } = await supabase
        .from('schools')
        .insert([{
          name: data.schoolName,
          join_code: joinCode
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      if (school) {
        toast({
          title: "School registered successfully!",
          description: `Your school "${data.schoolName}" has been registered. Join code: ${joinCode}`,
        });
        
        onSchoolCreated(school.id, school.name, school.join_code);
      }
    } catch (error: any) {
      console.error('School registration error:', error);
      toast({
        title: "Registration error",
        description: error.message || "There was an error registering your school.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-medium">Register Your School</h2>
        <p className="text-sm text-muted-foreground">
          Create a new school profile for your institution
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter school name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Registering School..." : "Register School"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SchoolRegistration;
