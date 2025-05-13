
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';
import { UserProfile } from '@/types/auth';

interface ProfileProgressProps {
  user: UserProfile;
}

// Points needed per level
const LEVEL_THRESHOLDS = {
  1: 0,
  2: 10,
  3: 20,
  4: 40,
  5: 80,
  6: 160,
  7: 320,
  8: 640,
  9: 1280
};

const ProfileProgress: React.FC<ProfileProgressProps> = ({ user }) => {
  const currentLevel = user.level || 1;
  const currentPoints = user.points || 0;
  
  // Calculate next level threshold
  const nextLevelThreshold = LEVEL_THRESHOLDS[currentLevel + 1 as keyof typeof LEVEL_THRESHOLDS] || Infinity;
  const prevLevelThreshold = LEVEL_THRESHOLDS[currentLevel as keyof typeof LEVEL_THRESHOLDS] || 0;
  
  // Calculate progress to next level
  const pointsForCurrentLevel = currentPoints - prevLevelThreshold;
  const pointsNeededForNextLevel = nextLevelThreshold - prevLevelThreshold;
  const progressPercentage = Math.min(Math.round((pointsForCurrentLevel / pointsNeededForNextLevel) * 100), 100);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="w-full border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={user.avatar_url || ""} alt={user.display_name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(user.display_name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium">{user.display_name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {user.role === 'school_admin' ? 'School Admin' : 
                 user.role === 'teacher' ? 'Teacher' : 
                 user.role === 'student' ? 'Student' : 'Guest'}
              </Badge>
              {user.school_name && (
                <Badge variant="outline" className="text-xs">
                  {user.school_name}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-medium">Level {currentLevel}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {pointsForCurrentLevel} / {pointsNeededForNextLevel} points to Level {currentLevel + 1}
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Current: {currentPoints} points</span>
            <span>Next level: {nextLevelThreshold} points</span>
          </div>
        </div>
        
        {user.badges && user.badges.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center">
              <Medal className="h-4 w-4 mr-1 text-primary" /> Achievements
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <Badge key={index} className="bg-gradient-to-r from-aishiksha-blue to-aishiksha-purple">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-sm flex items-center justify-between border-t pt-2 mt-2">
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-muted-foreground">{user.completed_levels?.length || 0} Levels Completed</span>
          </span>
          <span className="text-muted-foreground">{user.days_active || 1} Days Active</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;
