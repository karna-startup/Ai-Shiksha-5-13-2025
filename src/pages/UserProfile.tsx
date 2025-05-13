
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PlaceholderPage from '@/components/common/PlaceholderPage';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProfileProgress from '@/components/profile/ProfileProgress';
import Leaderboard from '@/components/leaderboard/Leaderboard';
import { LevelProgress } from '@/components/level/LevelProgress';
import { School, BookOpen, Settings, Award } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <PlaceholderPage title="Loading Profile..." description="Please wait while we load your profile data.">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PlaceholderPage>
    );
  }

  if (!user) {
    return (
      <PlaceholderPage title="Profile Not Found" description="You need to be signed in to view this page.">
        <div className="flex justify-center">
          <Button onClick={() => navigate('/auth/login')}>Sign In</Button>
        </div>
      </PlaceholderPage>
    );
  }

  // Calculate current level progress
  const currentLevel = user.level || 1;
  const currentLevelProgress = Math.min(Math.round((user.points || 0) / 10) * 10, 100);

  return (
    <PlaceholderPage title="Your Profile" description="View your progress and achievements">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileProgress user={user} />
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="progress" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Courses</span>
              </TabsTrigger>
              <TabsTrigger value="school" className="flex items-center gap-2">
                <School className="h-4 w-4" />
                <span className="hidden sm:inline">School</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress">
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Level</CardTitle>
                    <CardDescription>
                      Level {currentLevel} - {user.points} points earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LevelProgress progress={currentLevelProgress} level={currentLevel} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Achievements</CardTitle>
                    <CardDescription>
                      Badges and awards you've earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.badges && user.badges.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {user.badges.map((badge, index) => (
                          <div key={index} className="flex items-center p-2 bg-secondary rounded-md">
                            <Award className="h-5 w-5 mr-2 text-primary" />
                            <span className="text-sm font-medium">{badge}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        Complete levels to earn badges and achievements
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Your Courses</CardTitle>
                  <CardDescription>
                    Courses you're currently enrolled in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4 text-muted-foreground">
                    Your enrolled courses will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="school">
              <Leaderboard schoolId={user.school_id} schoolName={user.school_name} />
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4 text-muted-foreground">
                    Profile settings will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PlaceholderPage>
  );
};

export default UserProfile;
