
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import SchoolRegistration from '../SchoolRegistration';
import SchoolSelector from './SchoolSelector';

interface SchoolRegistrationTabsProps {
  onSchoolCreated: (schoolId: string, schoolName: string, joinCode: string) => void;
}

const SchoolRegistrationTabs: React.FC<SchoolRegistrationTabsProps> = ({ onSchoolCreated }) => {
  const { watch } = useFormContext();
  const role = watch('role');
  
  return (
    <Tabs defaultValue="join" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="join">Join School</TabsTrigger>
        <TabsTrigger value="register">Register School</TabsTrigger>
      </TabsList>
      <TabsContent value="join" className="space-y-4 mt-4">
        <SchoolSelector role={role} />
      </TabsContent>
      
      <TabsContent value="register">
        <Card>
          <CardContent className="pt-4">
            <SchoolRegistration 
              onSchoolCreated={onSchoolCreated} 
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SchoolRegistrationTabs;
