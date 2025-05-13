
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Medal } from 'lucide-react';
import { UserProfile } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardProps {
  schoolId?: string;
  schoolName?: string;
}

interface LeaderboardUser {
  id: string;
  display_name: string;
  points: number;
  level: number;
  badges?: string[];
  avatar_url?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ schoolId, schoolName }) => {
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [timeFrame, setTimeFrame] = useState<'7days' | '30days' | 'alltime'>('7days');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase.from('profiles').select('id, display_name, points, level, badges, avatar_url')
          .order('points', { ascending: false })
          .limit(10);
          
        if (schoolId) {
          query = query.eq('school_id', schoolId);
        }
        
        // In a real app, we would also filter by timeFrame
        // This would require additional tracking of when points were earned
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching leaderboard:', error);
          return;
        }
        
        setLeaderboardUsers(data as LeaderboardUser[] || []);
      } catch (err) {
        console.error('Error in leaderboard fetch:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [schoolId, timeFrame]);
  
  const getInitials = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };
  
  const getBadgeIcon = (position: number) => {
    switch (position) {
      case 0: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1: return <Medal className="h-5 w-5 text-gray-400" />;
      case 2: return <Award className="h-5 w-5 text-amber-700" />;
      default: return position + 1;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            {schoolName ? `${schoolName} Leaderboard` : 'Leaderboard'}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={timeFrame === '7days' ? 'default' : 'outline'} 
              onClick={() => setTimeFrame('7days')}
            >
              7 days
            </Button>
            <Button 
              size="sm" 
              variant={timeFrame === '30days' ? 'default' : 'outline'} 
              onClick={() => setTimeFrame('30days')}
            >
              30 days
            </Button>
            <Button 
              size="sm" 
              variant={timeFrame === 'alltime' ? 'default' : 'outline'} 
              onClick={() => setTimeFrame('alltime')}
            >
              All time
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboardUsers.map((leaderboardUser, index) => {
              const isCurrentUser = leaderboardUser.id === user?.id;
              
              return (
                <div 
                  key={leaderboardUser.id} 
                  className={`flex items-center p-2 rounded-md ${
                    isCurrentUser ? 'bg-primary/10' : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="w-8 flex justify-center">
                    {typeof getBadgeIcon(index) === 'number' ? (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {getBadgeIcon(index)}
                      </div>
                    ) : (
                      getBadgeIcon(index)
                    )}
                  </div>
                  
                  <div className="flex items-center flex-1 ml-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={leaderboardUser.avatar_url || ""} />
                      <AvatarFallback>{getInitials(leaderboardUser.display_name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {leaderboardUser.display_name}
                        {isCurrentUser && <span className="ml-2 text-xs text-muted-foreground">(You)</span>}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      Level {leaderboardUser.level}
                    </div>
                    <div className="w-16 text-right text-sm font-medium text-primary">
                      +{leaderboardUser.points}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {leaderboardUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No users found in the leaderboard.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
