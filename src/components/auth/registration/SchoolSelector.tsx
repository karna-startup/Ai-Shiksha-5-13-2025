
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface School {
  id: string;
  name: string;
}

interface SchoolSelectorProps {
  role: string;
}

const SchoolSelector: React.FC<SchoolSelectorProps> = ({ role }) => {
  const { control, watch, setValue, getValues } = useFormContext();
  const { toast } = useToast();
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // Load schools from the database
  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoadingSchools(true);
      try {
        const { data, error } = await supabase
          .from('schools')
          .select('id, name')
          .order('name');
          
        if (error) throw error;
        
        setSchools(data || []);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setIsLoadingSchools(false);
      }
    };
    
    fetchSchools();
  }, []);

  const verifyJoinCode = async () => {
    const joinCode = getValues('joinCode');
    const schoolId = getValues('schoolId');
    
    if (!joinCode || !schoolId) {
      toast({
        title: "Verification failed",
        description: "Please select a school and enter a join code.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, join_code')
        .eq('id', schoolId)
        .single();
        
      if (error) throw error;
      
      if (data.join_code !== joinCode) {
        toast({
          title: "Invalid join code",
          description: "The join code does not match the selected school.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "Join code verified successfully.",
      });
      
      setSelectedSchool({ id: data.id, name: data.name });
    } catch (error: any) {
      console.error('Join code verification error:', error);
      toast({
        title: "Verification error",
        description: error.message || "There was an error verifying the join code.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <FormField
        control={control}
        name="schoolId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select School</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoadingSchools ? (
                  <SelectItem value="loading" disabled>Loading schools...</SelectItem>
                ) : schools.length > 0 ? (
                  schools.map(school => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No schools found</SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {role !== 'student' && watch('schoolId') && (
        <FormField
          control={control}
          name="joinCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Join Code</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="Enter join code" {...field} />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={verifyJoinCode}
                >
                  Verify
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default SchoolSelector;
